"use client"

import { usePathname } from "next/navigation"
import { ShoppingBag } from "lucide-react"

/**
 * Top-level header for the Orders section
 * Shows the current orders subsection based on the URL.
 */
export function OrdersHeader() {
  const pathname = usePathname()

  const section = pathname?.includes("/preparing")
    ? "Preparing"
    : pathname?.includes("/ready")
      ? "Ready for Pickup"
      : pathname?.includes("/completed")
        ? "Completed"
        : "New Orders"

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <ShoppingBag className="h-6 w-6 text-[#CC5500]" />
        <h1 className="text-2xl font-bold text-[#2F5233] leading-none">{section}</h1>
      </div>
    </header>
  )
}
