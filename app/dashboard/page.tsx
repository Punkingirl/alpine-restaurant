import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { LiveOrdersWidget } from "@/components/orders/live-orders-widget"
import { DailyStatsCards } from "@/components/analytics/daily-stats-cards"
import { QuickStatusOverview } from "@/components/dashboard/quick-status-overview"
import { HanmerSpringsWeather } from "@/components/local/hanmer-springs-weather"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#2F5233]">Restaurant Dashboard</h1>
        <HanmerSpringsWeather />
      </div>

      <DailyStatsCards />
      <QuickStatusOverview />
      <LiveOrdersWidget />
      <DashboardOverview />
    </div>
  )
}
