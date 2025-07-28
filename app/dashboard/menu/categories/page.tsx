import { CategoriesList } from "@/components/menu/categories-list"
import { AddCategoryButton } from "@/components/menu/add-category-button"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Menu Categories</h2>
        <AddCategoryButton />
      </div>
      <CategoriesList />
    </div>
  )
}
