import type React from "react"
import { MenuHeader } from "@/components/menu/menu-header"
import { MenuNavigation } from "@/components/menu/menu-navigation"

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <MenuHeader />
      <MenuNavigation />
      {children}
    </div>
  )
}
