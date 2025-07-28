import { NotificationSettings } from "@/components/settings/notification-settings"
import { AlertPreferences } from "@/components/settings/alert-preferences"
import { SoundSettings } from "@/components/settings/sound-settings"

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2F5233]">Notification Settings</h2>
      <NotificationSettings />
      <AlertPreferences />
      <SoundSettings />
    </div>
  )
}
