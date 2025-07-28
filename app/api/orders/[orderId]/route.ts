import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getOrder, updateOrder } from "@/lib/orders"

interface RouteParams {
  params: Promise<{ orderId: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions)
  const { orderId } = await params

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const order = await getOrder(orderId, session.user.restaurantId)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const session = await getServerSession(authOptions)
  const { orderId } = await params

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const updateData = await request.json()
    const order = await updateOrder(orderId, updateData, session.user.restaurantId)

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
