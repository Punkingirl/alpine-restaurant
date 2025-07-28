"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RestaurantImages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Restaurant Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <img
              src="/placeholder.jpg"
              alt="Restaurant"
              className="w-32 h-32 object-cover rounded border"
            />
            <img
              src="/placeholder-logo.png"
              alt="Logo"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
          <Button variant="outline" className="w-fit">
            Upload New Image
          </Button>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG. Max size: 2MB.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
