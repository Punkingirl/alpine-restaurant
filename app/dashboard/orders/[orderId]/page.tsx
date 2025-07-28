import { OrderDetails } from "@/components/orders/order-details"
import { OrderActions } from "@/components/orders/order-actions"
import { CustomerInfo } from "@/components/orders/customer-info"
import { DeliveryInfo } from "@/components/orders/delivery-info"

interface OrderPageProps {
  params: Promise<{ orderId: string }>
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Order {orderId}</h2>
        <OrderActions orderId={orderId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderDetails orderId={orderId} />
        </div>
        <div className="space-y-6">
          <CustomerInfo orderId={orderId} />
          <DeliveryInfo orderId={orderId} />
        </div>
      </div>
    </div>
  )
}
