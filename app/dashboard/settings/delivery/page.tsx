import { DeliveryZonesMap } from "@/components/settings/delivery-zones-map"
import { DeliverySettings } from "@/components/settings/delivery-settings"
import { HanmerSpringsZones } from "@/components/settings/hanmer-springs-zones"

export default function DeliverySettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2F5233]">Delivery Settings</h2>
      <DeliverySettings />
      <HanmerSpringsZones />
      <DeliveryZonesMap />
    </div>
  )
}
