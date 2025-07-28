import { ReadyOrdersList } from "@/components/orders/ready-orders-list"
import { DeliveryTracker } from "@/components/orders/delivery-tracker"

export default function ReadyOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Ready for Pickup</h2>
        <DeliveryTracker />
      </div>
      <ReadyOrdersList />
    </div>
  )
}
