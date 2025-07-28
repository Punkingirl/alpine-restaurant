export interface MenuItem {
  id: string
  restaurantId: string
  categoryId: string
  name: string
  description: string
  price: number
  currency: "NZD"
  isAvailable: boolean
  isPopular: boolean
  preparationTime: number
  allergens: string[]
  dietaryInfo: DietaryInfo[]
  images: string[]
  modifiers: MenuModifier[]
  createdAt: Date
  updatedAt: Date
}

export interface MenuCategory {
  id: string
  restaurantId: string
  name: string
  description?: string
  sortOrder: number
  isActive: boolean
  items: MenuItem[]
}

export interface MenuModifier {
  id: string
  name: string
  options: ModifierOption[]
  isRequired: boolean
  maxSelections: number
}

export interface ModifierOption {
  id: string
  name: string
  priceAdjustment: number
}

export type DietaryInfo =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "halal"
  | "keto"
  | "low-carb"
