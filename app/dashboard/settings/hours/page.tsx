import { BusinessHoursForm } from "@/components/settings/business-hours-form"
import { HolidaySchedule } from "@/components/settings/holiday-schedule"
import { SeasonalHours } from "@/components/settings/seasonal-hours"

export default function HoursSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2F5233]">Business Hours</h2>
      <BusinessHoursForm />
      <SeasonalHours />
      <HolidaySchedule />
    </div>
  )
}
