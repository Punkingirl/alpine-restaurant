import { PreparingOrdersList } from "@/components/orders/preparing-orders-list"
import { KitchenTimer } from "@/components/orders/kitchen-timer"

export default function PreparingOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Orders in Preparation</h2>
        <KitchenTimer />
      </div>
      <PreparingOrdersList />
    </div>
  )
}
