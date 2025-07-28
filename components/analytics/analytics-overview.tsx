"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, DollarSign, Users } from "lucide-react";

export function AnalyticsOverview() {
  // Mock data
  const stats = [
    {
      label: "Total Sales",
      value: "$12,340",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Total Orders",
      value: "1,234",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      label: "Avg Order Value",
      value: "$23.45",
      icon: TrendingUp,
      color: "text-yellow-600",
    },
    {
      label: "Unique Customers",
      value: "876",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-2 sm:p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">
              {stat.label}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
