import { NewOrdersList } from "@/components/orders/new-orders-list"
import { OrderFilters } from "@/components/orders/order-filters"

export default function NewOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">New Orders</h2>
        <OrderFilters />
      </div>
      <NewOrdersList />
    </div>
  )
}
