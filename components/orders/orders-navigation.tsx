"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { name: "New", href: "/dashboard/orders/new" },
  { name: "Preparing", href: "/dashboard/orders/preparing" },
  { name: "Ready", href: "/dashboard/orders/ready" },
  { name: "Completed", href: "/dashboard/orders/completed" },
]

/**
 * Horizontal navigation bar for switching between
 * the four order states.
 */
export function OrdersNavigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((l) => {
        const active = pathname?.startsWith(l.href)
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              active ? "bg-[#CC5500] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {l.name}
          </Link>
        )
      })}
    </nav>
  )
}
