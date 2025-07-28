import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { getMenuItems, createMenuItem } from "@/lib/menu"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const menuItems = await getMenuItems(session.user.restaurantId)
    return NextResponse.json(menuItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const itemData = await request.json()
    const menuItem = await createMenuItem({
      ...itemData,
      restaurantId: session.user.restaurantId,
    })

    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}
