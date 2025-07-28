"use client";

import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

export function MenuHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[#2F5233]">Menu Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage your restaurant's menu items, categories, and availability
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Menu Settings
        </Button>
        <Button className="bg-[#2F5233] hover:bg-green-800 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </div>
  );
}
