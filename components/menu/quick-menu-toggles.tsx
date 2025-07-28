"use client";

import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export function QuickMenuToggles() {
  const [menuVisible, setMenuVisible] = useState(true);
  const [acceptingOrders, setAcceptingOrders] = useState(true);

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row gap-4 py-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={menuVisible}
            onCheckedChange={setMenuVisible}
            id="menu-visible"
          />
          <label htmlFor="menu-visible" className="text-sm font-medium">
            Menu Visible to Customers
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={acceptingOrders}
            onCheckedChange={setAcceptingOrders}
            id="accepting-orders"
          />
          <label htmlFor="accepting-orders" className="text-sm font-medium">
            Accepting Online Orders
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
