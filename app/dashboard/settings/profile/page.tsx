import { RestaurantProfileForm } from "@/components/settings/restaurant-profile-form"
import { RestaurantImages } from "@/components/settings/restaurant-images"

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2F5233]">Restaurant Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RestaurantProfileForm />
        <RestaurantImages />
      </div>
    </div>
  )
}
