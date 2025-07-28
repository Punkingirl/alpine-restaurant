import { MenuItemDetails } from "@/components/menu/menu-item-details"
import { MenuItemForm } from "@/components/menu/menu-item-form"

interface MenuItemPageProps {
  params: Promise<{ itemId: string }>
}

export default async function MenuItemPage({ params }: MenuItemPageProps) {
  const { itemId } = await params

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2F5233]">{itemId === "new" ? "Add New Menu Item" : "Edit Menu Item"}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MenuItemForm itemId={itemId} />
        {itemId !== "new" && <MenuItemDetails itemId={itemId} />}
      </div>
    </div>
  )
}
