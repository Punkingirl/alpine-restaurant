"use client"

import Link from "next/link"
import { Bell, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/**
 * Compact widget that shows the number of new / active orders
 * and links staff to the main Orders screen.
 * Replace the mocked numbers with live data once the backend is wired up.
 */
export function LiveOrdersWidget() {
  // Temporary mock values
  const newOrders = 3
  const preparing = 2
  const ready = 1

  return (
    <Card className="border-l-4 border-[#CC5500]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-sm text-[#2F5233]">
          <Bell className="h-4 w-4 mr-2 text-[#CC5500]" />
          Live Orders
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span>New Orders</span>
          <Badge variant="destructive">{newOrders}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Preparing</span>
          <Badge>{preparing}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span>Ready for Pickup</span>
          <Badge variant="outline">{ready}</Badge>
        </div>

        <Link href="/dashboard/orders" passHref>
          <Button className="mt-4 w-full bg-[#2F5233] hover:bg-green-800 text-white">
            <Clock className="h-4 w-4 mr-2" />
            Manage Orders
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
