export interface Restaurant {
  id: string
  name: string
  email: string
  phone: string
  address: string
  cuisine: string[]
  isActive: boolean
  businessHours: BusinessHours
  deliveryZones: DeliveryZone[]
  settings: RestaurantSettings
  createdAt: Date
  updatedAt: Date
}

export interface BusinessHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  isOpen: boolean
  openTime: string
  closeTime: string
  breaks?: TimeSlot[]
}

export interface TimeSlot {
  start: string
  end: string
}

export interface DeliveryZone {
  id: string
  name: string
  area: string
  deliveryFee: number
  minimumOrder: number
  estimatedTime: number
  isActive: boolean
}

export interface RestaurantSettings {
  notifications: NotificationSettings
  orderSettings: OrderSettings
  paymentSettings: PaymentSettings
}

export interface NotificationSettings {
  newOrderSound: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
}

export interface OrderSettings {
  autoAccept: boolean
  preparationTime: number
  maxOrdersPerHour: number
}

export interface PaymentSettings {
  acceptCash: boolean
  acceptCard: boolean
  acceptOnline: boolean
}
