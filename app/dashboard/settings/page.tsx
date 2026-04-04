import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { mockProfiles } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function DashboardSettingsPage() {
  const profile = mockProfiles[0]

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Settings</h1>
        <p className="mt-1" style={{ color: 'var(--text3)' }}>Manage your account and preferences</p>
      </div>

      <div className="max-w-xl space-y-8">
        {/* Profile settings */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Profile information</h2>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full name" defaultValue={profile.full_name} />
              <Input label="Username" defaultValue={profile.username} />
            </div>
            <Input label="Location" defaultValue={profile.location ?? ''} placeholder="City, Country" />
            <Input label="Website" defaultValue={profile.website ?? ''} placeholder="https://yourwebsite.com" />
            <Textarea label="Bio" defaultValue={profile.bio ?? ''} rows={3} placeholder="Tell the community about yourself..." />
            <Button type="button">Save changes</Button>
          </form>
        </div>

        {/* Email */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Email &amp; security</h2>
          <form className="space-y-4">
            <Input label="Email address" type="email" defaultValue="alex@example.com" />
            <Input label="Current password" type="password" placeholder="••••••••" />
            <Input label="New password" type="password" placeholder="Minimum 8 characters" />
            <Button type="button">Update security</Button>
          </form>
        </div>

        {/* Notifications */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold mb-6" style={{ color: 'var(--text)' }}>Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Prediction resolved', description: 'When a prediction you voted on is resolved', defaultChecked: true },
              { label: 'New predictions', description: 'Weekly digest of trending predictions', defaultChecked: true },
              { label: 'Rank changes', description: 'When your global rank changes', defaultChecked: false },
              { label: 'Comments', description: 'When someone comments on your predictions', defaultChecked: true },
            ].map((notif) => (
              <div key={notif.label} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{notif.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>{notif.description}</p>
                </div>
                <button
                  className="relative w-10 h-6 rounded-full transition-colors flex-shrink-0"
                  style={{ background: notif.defaultChecked ? 'var(--accent)' : 'var(--border)' }}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full shadow transition-transform"
                    style={{ background: 'var(--bg)', left: notif.defaultChecked ? '1rem' : '0.125rem' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-2xl p-8" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <h2 className="font-semibold mb-2" style={{ color: 'var(--zred)' }}>Danger zone</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text3)' }}>Permanently delete your account and all associated data.</p>
          <Button variant="danger" size="sm">Delete account</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
