"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, ChefHat, Truck } from "lucide-react";

/**
 * High-level counts for each order state.
 * Replace the hard-coded numbers with live data later.
 */
export function OrdersOverview() {
  const counts = {
    new: 3,
    preparing: 2,
    ready: 1,
  };

  return (
    <section className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      <StatusCard
        icon={Bell}
        label="New Orders"
        count={counts.new}
        color="bg-red-600"
        href="/dashboard/orders/new"
      />
      <StatusCard
        icon={ChefHat}
        label="Preparing"
        count={counts.preparing}
        color="bg-yellow-500"
        href="/dashboard/orders/preparing"
      />
      <StatusCard
        icon={Truck}
        label="Ready for Pickup"
        count={counts.ready}
        color="bg-green-600"
        href="/dashboard/orders/ready"
      />
    </section>
  );
}

interface StatusCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  count: number;
  color: string;
  href: string;
}

function StatusCard({
  icon: Icon,
  label,
  count,
  color,
  href,
}: StatusCardProps) {
  return (
    <a href={href} className="block">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow p-2 sm:p-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-xs sm:text-sm text-[#2F5233]">
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge
            className={`${color} text-white px-3 py-1 text-base sm:text-lg`}
          >
            {count}
          </Badge>
        </CardContent>
      </Card>
    </a>
  );
}
