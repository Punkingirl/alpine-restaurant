import type React from "react"
import { OrdersHeader } from "@/components/orders/orders-header"
import { OrdersNavigation } from "@/components/orders/orders-navigation"

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <OrdersHeader />
      <OrdersNavigation />
      {children}
    </div>
  )
}
