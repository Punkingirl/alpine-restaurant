import type { Restaurant } from "@/types/restaurant"

/**
 * Temporary helper for verifying restaurant credentials.
 * Replace this stub with a real database lookup (e.g. Prisma)
 * once your persistence layer is ready.
 */
export async function verifyRestaurantCredentials(email: string, password: string): Promise<Restaurant | null> {
  // DEMO ― accept one hard-coded account
  if (email === "demo@alpinedelivery.co" && password === "password") {
    return {
      id: "demo-restaurant",
      name: "Saints Cafe Restaurant & Bar",
      email,
      phone: "+64 21 000 0000",
      address: "24 Conical Hill Road, Hanmer Springs",
      cuisine: ["Cafe", "New Zealand"],
      isActive: true,
      businessHours: {} as any,
      deliveryZones: [],
      settings: {} as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  // TODO: query your database to validate real accounts
  return null
}
