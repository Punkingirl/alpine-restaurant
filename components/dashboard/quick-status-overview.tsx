"use client"

import type React from "react"

import { ChefHat, Truck, Users, Cloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Summarises key operational statuses (kitchen load, delivery timing, etc.).
 * Replace mocked values with live data once available.
 */
export function QuickStatusOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#2F5233]">Quick Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatusTile icon={ChefHat} label="Kitchen" value="Normal" iconColor="text-green-600" />
          <StatusTile icon={Truck} label="Delivery" value="On Time" iconColor="text-blue-600" />
          <StatusTile icon={Users} label="Today" value="Busy" iconColor="text-[#CC5500]" />
          <StatusTile icon={Cloud} label="Weather" value="Clear" iconColor="text-blue-500" />
        </div>
      </CardContent>
    </Card>
  )
}

interface StatusTileProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  value: string
  iconColor: string
}

function StatusTile({ icon: Icon, label, value, iconColor }: StatusTileProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className={`h-5 w-5 ${iconColor}`} />
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium">{label}:</span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  )
}
