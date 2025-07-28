"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          {/* Replace with real chart */}
          <span>Orders bar chart goes here</span>
        </div>
      </CardContent>
    </Card>
  );
}
