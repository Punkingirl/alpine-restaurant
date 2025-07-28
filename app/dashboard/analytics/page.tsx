import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { SalesChart } from "@/components/analytics/sales-chart"
import { OrdersChart } from "@/components/analytics/orders-chart"
import { PopularItemsChart } from "@/components/analytics/popular-items-chart"
import { PeakHoursAnalysis } from "@/components/analytics/peak-hours-analysis"
import { HanmerSpringsInsights } from "@/components/analytics/hanmer-springs-insights"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#2F5233]">Analytics & Reports</h1>

      <AnalyticsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <OrdersChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PopularItemsChart />
        <PeakHoursAnalysis />
      </div>

      <HanmerSpringsInsights />
    </div>
  )
}
