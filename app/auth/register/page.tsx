import { RestaurantRegistrationForm } from "@/components/auth/restaurant-registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-[#2F5233]">Join Alpine Delivery Co.</CardTitle>
          <CardDescription>Register your Hanmer Springs restaurant as a delivery partner</CardDescription>
        </CardHeader>
        <CardContent>
          <RestaurantRegistrationForm />
        </CardContent>
      </Card>
    </div>
  )
}
