"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          {/* Replace with real chart */}
          <span>Sales line chart goes here</span>
        </div>
      </CardContent>
    </Card>
  );
}
