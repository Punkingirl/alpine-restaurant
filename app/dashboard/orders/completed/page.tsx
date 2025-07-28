import { CompletedOrdersList } from "@/components/orders/completed-orders-list"
import { OrdersAnalytics } from "@/components/orders/orders-analytics"

export default function CompletedOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Completed Orders</h2>
        <OrdersAnalytics />
      </div>
      <CompletedOrdersList />
    </div>
  )
}
