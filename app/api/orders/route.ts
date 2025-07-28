import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getOrders, createOrder } from "@/lib/orders"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const limit = searchParams.get("limit")

  try {
    const orders = await getOrders({
      restaurantId: session.user.restaurantId,
      status,
      limit: limit ? Number.parseInt(limit) : undefined,
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const orderData = await request.json()
    const order = await createOrder({
      ...orderData,
      restaurantId: session.user.restaurantId,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
