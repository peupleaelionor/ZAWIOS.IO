/**
 * /api/admin/moderation — Admin moderation endpoints for predictions and media.
 * Supports approve, reject, and propose (suggest edits) actions.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('user_id', user.id)
    .single()

  if (!profile?.is_admin) return null
  return user
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin()
  if (!admin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const payload = body as Record<string, unknown>
  const action = payload.action as string
  const targetType = payload.target_type as string
  const targetId = payload.target_id as string

  if (!action || !targetType || !targetId) {
    return NextResponse.json({ error: 'action, target_type, and target_id required' }, { status: 400 })
  }

  const adminSupabase = createAdminClient()

  // ─── Prediction Moderation ────────────────────────────────
  if (targetType === 'prediction') {
    if (action === 'approve') {
      const { error } = await adminSupabase
        .from('predictions')
        .update({
          moderated_at: new Date().toISOString(),
          moderated_by: admin.id,
          status: 'open',
        })
        .eq('id', targetId)

      if (error) return NextResponse.json({ error: 'Failed to approve' }, { status: 500 })

      // Audit log
      await adminSupabase.from('audit_logs').insert({
        actor_id: admin.id,
        action: 'prediction_approved',
        target_type: 'prediction',
        target_id: targetId,
        metadata: {},
      })

      return NextResponse.json({ status: 'approved' })
    }

    if (action === 'reject') {
      const reason = typeof payload.reason === 'string' ? payload.reason : 'Does not meet guidelines'

      const { error } = await adminSupabase
        .from('predictions')
        .update({
          moderated_at: new Date().toISOString(),
          moderated_by: admin.id,
          status: 'archived',
          resolution_notes: `Rejected: ${reason}`,
        })
        .eq('id', targetId)

      if (error) return NextResponse.json({ error: 'Failed to reject' }, { status: 500 })

      // Audit log
      await adminSupabase.from('audit_logs').insert({
        actor_id: admin.id,
        action: 'prediction_rejected',
        target_type: 'prediction',
        target_id: targetId,
        metadata: { reason },
      })

      return NextResponse.json({ status: 'rejected' })
    }

    if (action === 'propose') {
      // Admin proposes edits — stores suggestion without modifying original
      const suggestion = typeof payload.suggestion === 'string' ? payload.suggestion : ''
      if (!suggestion) {
        return NextResponse.json({ error: 'suggestion text required for propose action' }, { status: 400 })
      }

      await adminSupabase.from('audit_logs').insert({
        actor_id: admin.id,
        action: 'prediction_edit_proposed',
        target_type: 'prediction',
        target_id: targetId,
        metadata: { suggestion },
      })

      // Create notification for the prediction creator
      const { data: prediction } = await adminSupabase
        .from('predictions')
        .select('created_by, title')
        .eq('id', targetId)
        .single()

      if (prediction) {
        await adminSupabase.from('notifications').insert({
          user_id: prediction.created_by,
          type: 'system',
          title: 'Edit suggestion for your prediction',
          body: `An admin has suggested changes to "${prediction.title?.slice(0, 80)}": ${suggestion.slice(0, 200)}`,
          metadata: { prediction_id: targetId, suggestion },
        })
      }

      return NextResponse.json({ status: 'proposed' })
    }
  }

  // ─── Media Moderation ─────────────────────────────────────
  if (targetType === 'media') {
    if (action === 'approve' || action === 'reject') {
      try {
        await adminSupabase
          .from('generated_media')
          .update({
            status: action === 'approve' ? 'approved' : 'rejected',
          })
          .eq('id', targetId)
      } catch {
        /* generated_media table may not exist yet */
      }

      await adminSupabase.from('audit_logs').insert({
        actor_id: admin.id,
        action: `media_${action}d`,
        target_type: 'media',
        target_id: targetId,
        metadata: {},
      })

      return NextResponse.json({ status: action === 'approve' ? 'approved' : 'rejected' })
    }
  }

  // ─── Comment Moderation ───────────────────────────────────
  if (targetType === 'comment') {
    if (action === 'hide') {
      await adminSupabase
        .from('comments')
        .update({ is_hidden: true })
        .eq('id', targetId)

      await adminSupabase.from('audit_logs').insert({
        actor_id: admin.id,
        action: 'comment_hidden',
        target_type: 'comment',
        target_id: targetId,
        metadata: {},
      })

      return NextResponse.json({ status: 'hidden' })
    }

    if (action === 'unhide') {
      await adminSupabase
        .from('comments')
        .update({ is_hidden: false })
        .eq('id', targetId)

      return NextResponse.json({ status: 'visible' })
    }
  }

  return NextResponse.json({ error: 'Invalid action or target_type' }, { status: 400 })
}
