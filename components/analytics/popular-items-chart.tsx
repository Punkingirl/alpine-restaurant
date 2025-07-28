"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PopularItemsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Menu Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          {/* Replace with real chart */}
          <span>Popular items chart goes here</span>
        </div>
      </CardContent>
    </Card>
  );
}
