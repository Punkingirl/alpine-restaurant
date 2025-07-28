"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"

export function DashboardOverview() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-sm text-[#2F5233]">
            <TrendingUp className="mr-2 h-4 w-4" />
            Orders This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">84</p>
          <p className="text-xs text-gray-600">+12% vs last week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-sm text-[#2F5233]">
            <DollarSign className="mr-2 h-4 w-4" />
            Revenue This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$3,750 NZD</p>
          <p className="text-xs text-gray-600">Avg Order $44.64</p>
        </CardContent>
      </Card>
    </section>
  )
}
