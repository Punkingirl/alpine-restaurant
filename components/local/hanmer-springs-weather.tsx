"use client"

import { useState } from "react"
import { Sun, CloudRain, Cloud, Snowflake } from "lucide-react"
import { Badge } from "@/components/ui/badge"

/**
 * Simple mock weather widget for Hanmer Springs.
 * Swap the hard-coded data for a real weather API later.
 */
export function HanmerSpringsWeather() {
  // In a real app you’d fetch this from an API.
  const [weather] = useState<"clear" | "cloudy" | "rain" | "snow">("clear")
  const [tempC] = useState(14) // current °C

  // Choose an icon based on condition
  const Icon = weather === "clear" ? Sun : weather === "cloudy" ? Cloud : weather === "rain" ? CloudRain : Snowflake

  const label = weather === "clear" ? "Clear" : weather === "cloudy" ? "Cloudy" : weather === "rain" ? "Rain" : "Snow"

  return (
    <Badge className="flex items-center space-x-1 bg-[#2F5233] text-white hover:bg-green-800">
      <Icon className="h-4 w-4" />
      <span>
        {label} – {tempC}°C
      </span>
    </Badge>
  )
}
