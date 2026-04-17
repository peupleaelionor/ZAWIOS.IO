'use client'

import { useState, useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function DashboardSettingsPage() {
  const [profile, setProfile] = useState({
    full_name: '',
    username: '',
    location: '',
    website: '',
    bio: '',
  })
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [loadingSecurity, setLoadingSecurity] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) {
          setProfile({
            full_name: data.profile.full_name || '',
            username: data.profile.username || '',
            location: data.profile.location || '',
            website: data.profile.website || '',
            bio: data.profile.bio || '',
          })
          setEmail(data.email || '')
          setLoaded(true)
        }
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingProfile(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (!res.ok) throw new Error('Failed to update')
      toast.success('Profile updated')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoadingProfile(false)
    }
  }

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSecurity(true)
    try {
      const body: Record<string, string> = {}
      if (email) body.email = email
      if (newPassword && newPassword.length >= 8) body.new_password = newPassword
      if (Object.keys(body).length === 0) {
        toast.error('No changes to save')
        return
      }
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.warning) {
        toast.warning(data.warning)
      } else if (!res.ok) {
        throw new Error('Failed to update')
      } else {
        toast.success('Security settings updated')
      }
      setCurrentPassword('')
      setNewPassword('')
    } catch {
      toast.error('Failed to update security settings')
    } finally {
      setLoadingSecurity(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text)]">Settings</h1>
        <p className="text-[var(--text2)] mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-xl space-y-8">
        {/* Profile settings */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold text-[var(--text)] mb-6">Profile information</h2>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full name"
                value={profile.full_name}
                onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))}
              />
              <Input
                label="Username"
                value={profile.username}
                onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))}
              />
            </div>
            <Input
              label="Location"
              value={profile.location}
              onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
              placeholder="City, Country"
            />
            <Input
              label="Website"
              value={profile.website}
              onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
              placeholder="https://yourwebsite.com"
            />
            <Textarea
              label="Bio"
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              rows={3}
              placeholder="Tell the community about yourself..."
            />
            <Button type="submit" loading={loadingProfile} disabled={!loaded}>
              Save changes
            </Button>
          </form>
        </div>

        {/* Email */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold text-[var(--text)] mb-6">Email &amp; security</h2>
          <form onSubmit={handleSecuritySubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Current password"
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="New password"
              type="password"
              placeholder="Minimum 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button type="submit" loading={loadingSecurity} disabled={!loaded}>
              Update security
            </Button>
          </form>
        </div>

        {/* Notifications */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold text-[var(--text)] mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Signal resolved', description: 'When a signal you voted on is resolved', defaultChecked: true },
              { label: 'New signals', description: 'Weekly digest of trending signals', defaultChecked: true },
              { label: 'Rank changes', description: 'When your global rank changes', defaultChecked: false },
              { label: 'Comments', description: 'When someone comments on your signals', defaultChecked: true },
            ].map((notif) => (
              <div key={notif.label} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{notif.label}</p>
                  <p className="text-xs text-[var(--text2)] mt-0.5">{notif.description}</p>
                </div>
                <button
                  role="switch"
                  aria-checked={notif.defaultChecked}
                  aria-label={notif.label}
                  className={`relative w-10 h-6 rounded-full transition-colors ${notif.defaultChecked ? 'bg-[var(--accent)]' : 'bg-[var(--surface2)]'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notif.defaultChecked ? 'left-4' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-[var(--surface)] border border-[var(--zred)]/30 rounded-2xl p-8">
          <h2 className="font-semibold text-[var(--zred)] mb-2">Danger zone</h2>
          <p className="text-sm text-[var(--text2)] mb-4">Permanently delete your account and all associated data.</p>
          <Button variant="danger" size="sm">Delete account</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
