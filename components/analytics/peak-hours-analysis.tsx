"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PeakHoursAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Peak Hours Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-center justify-center text-muted-foreground">
          {/* Replace with real chart */}
          <span>Peak hours analysis goes here</span>
        </div>
      </CardContent>
    </Card>
  );
}
