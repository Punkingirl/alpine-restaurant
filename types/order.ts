export interface Order {
  id: string
  orderNumber: string
  restaurantId: string
  customerId: string
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  currency: "NZD"
  customer: Customer
  deliveryAddress: DeliveryAddress
  specialInstructions?: string
  estimatedPreparationTime: number
  estimatedDeliveryTime: number
  createdAt: Date
  updatedAt: Date
  acceptedAt?: Date
  preparingAt?: Date
  readyAt?: Date
  pickedUpAt?: Date
  deliveredAt?: Date
}

export type OrderStatus = "new" | "accepted" | "preparing" | "ready" | "picked_up" | "delivered" | "cancelled"

export interface OrderItem {
  id: string
  menuItemId: string
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  modifications?: string[]
  specialRequests?: string
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
}

export interface DeliveryAddress {
  street: string
  city: string
  postalCode: string
  landmark?: string
  deliveryInstructions?: string
  zone: string
}
