import { MenuOverview } from "@/components/menu/menu-overview"
import { MenuCategories } from "@/components/menu/menu-categories"
import { QuickMenuToggles } from "@/components/menu/quick-menu-toggles"

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <QuickMenuToggles />
      <MenuCategories />
      <MenuOverview />
    </div>
  )
}
