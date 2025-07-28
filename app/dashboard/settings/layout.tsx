import type React from "react"
import { SettingsNavigation } from "@/components/settings/settings-navigation"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#2F5233]">Restaurant Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SettingsNavigation />
        </div>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  )
}
