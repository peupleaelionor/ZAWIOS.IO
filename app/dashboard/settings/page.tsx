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
        <h1 className="text-2xl font-bold text-[var(--text)]">Settings</h1>
        <p className="text-[var(--text2)] mt-1">Manage your account and preferences</p>
      </div>

      <div className="max-w-xl space-y-8">
        {/* Profile settings */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold text-[var(--text)] mb-6">Profile information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
          <h2 className="font-semibold text-[var(--text)] mb-6">Email &amp; security</h2>
          <form className="space-y-4">
            <Input label="Email address" type="email" defaultValue="alex@example.com" />
            <Input label="Current password" type="password" placeholder="••••••••" />
            <Input label="New password" type="password" placeholder="Minimum 8 characters" />
            <Button type="button">Update security</Button>
          </form>
        </div>

        {/* Notifications */}
        <div className="surface rounded-2xl p-8">
          <h2 className="font-semibold text-[var(--text)] mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Prediction resolved', description: 'When a prediction you voted on is resolved', defaultChecked: true },
              { label: 'New predictions', description: 'Weekly digest of trending predictions', defaultChecked: true },
              { label: 'Rank changes', description: 'When your global rank changes', defaultChecked: false },
              { label: 'Comments', description: 'When someone comments on your predictions', defaultChecked: true },
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
