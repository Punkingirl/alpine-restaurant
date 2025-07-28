import LoginForm from "@/components/LoginForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50">
      <header className="w-full">
        {/* The AlpineAuthHeader is rendered by the layout, so nothing needed here */}
      </header>
      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="flex items-center justify-center min-h-[calc(100vh-400px)] w-full">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-[#2F5233]">Restaurant Portal</CardTitle>
              <CardDescription>Access your Alpine Delivery Co. restaurant dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
