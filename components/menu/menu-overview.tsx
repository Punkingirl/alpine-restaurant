"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  Package,
  TrendingUp,
  AlertCircle,
  Clock,
  Star,
} from "lucide-react";

// Mock data - replace with real data later
const menuStats = {
  totalItems: 24,
  activeItems: 22,
  categories: 6,
  popularItems: 8,
  lowStock: 3,
  averagePrepTime: 18,
};

const recentActivity = [
  {
    id: "1",
    action: "Item Updated",
    item: "Margherita Pizza",
    time: "2 minutes ago",
    type: "update",
  },
  {
    id: "2",
    action: "New Item Added",
    item: "BBQ Chicken Wings",
    time: "15 minutes ago",
    type: "add",
  },
  {
    id: "3",
    action: "Item Disabled",
    item: "Seasonal Salad",
    time: "1 hour ago",
    type: "disable",
  },
];

export function MenuOverview() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "add":
        return <Package className="h-4 w-4 text-green-600" />;
      case "update":
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "disable":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Utensils className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "add":
        return <Badge className="bg-green-100 text-green-800">Added</Badge>;
      case "update":
        return <Badge className="bg-blue-100 text-blue-800">Updated</Badge>;
      case "disable":
        return <Badge className="bg-red-100 text-red-800">Disabled</Badge>;
      default:
        return <Badge variant="secondary">Modified</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Menu Items
            </CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {menuStats.activeItems} currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuStats.categories}</div>
            <p className="text-xs text-muted-foreground">Menu organization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Popular Items</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuStats.popularItems}</div>
            <p className="text-xs text-muted-foreground">
              High-performing items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Alert
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {menuStats.lowStock}
            </div>
            <p className="text-xs text-muted-foreground">
              Items need restocking
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Prep Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {menuStats.averagePrepTime}m
            </div>
            <p className="text-xs text-muted-foreground">
              Average preparation time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <p className="text-xs text-muted-foreground">
              Overall menu performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.item}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getActivityBadge(activity.type)}
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
