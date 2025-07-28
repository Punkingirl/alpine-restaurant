import { MenuItemsList } from "@/components/menu/menu-items-list"
import { AddMenuItemButton } from "@/components/menu/add-menu-item-button"
import { MenuItemFilters } from "@/components/menu/menu-item-filters"

export default function MenuItemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Menu Items</h2>
        <div className="flex items-center space-x-4">
          <MenuItemFilters />
          <AddMenuItemButton />
        </div>
      </div>
      <MenuItemsList />
    </div>
  )
}
