import { OrdersOverview } from "@/components/orders/orders-overview"
import { OrdersTabs } from "@/components/orders/orders-tabs"

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <OrdersOverview />
      <OrdersTabs />
    </div>
  )
}
