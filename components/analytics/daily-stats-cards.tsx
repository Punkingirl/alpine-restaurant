"use client";

import { DollarSign, Star, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Displays quick-glance KPI cards for the current day.
 * Swap the hard-coded values for real data once your API is ready.
 */
export function DailyStatsCards() {
  const ordersToday = 12;
  const revenueToday = 450; // NZD
  const avgOrder = 37.5;
  const rating = 4.8;

  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-4">
      <Card className="p-2 md:p-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xs md:text-sm text-[#2F5233]">
            <TrendingUp className="mr-2 h-4 w-4" />
            Orders Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">{ordersToday}</p>
          <p className="text-xs text-gray-600">+3 vs yesterday</p>
        </CardContent>
      </Card>

      <Card className="p-2 md:p-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xs md:text-sm text-[#2F5233]">
            <DollarSign className="mr-2 h-4 w-4" />
            Revenue Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">${revenueToday} NZD</p>
          <p className="text-xs text-gray-600">Avg order ${avgOrder}</p>
        </CardContent>
      </Card>

      <Card className="p-2 md:p-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xs md:text-sm text-[#2F5233]">
            <Star className="mr-2 h-4 w-4" />
            Customer Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">{rating}/5</p>
          <p className="text-xs text-gray-600">23 reviews today</p>
        </CardContent>
      </Card>

      <Card className="p-2 md:p-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xs md:text-sm text-[#2F5233]">
            Peak Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl md:text-2xl font-bold">6 – 8 PM</p>
          <p className="text-xs text-gray-600">Expected busy period</p>
        </CardContent>
      </Card>
    </section>
  );
}
