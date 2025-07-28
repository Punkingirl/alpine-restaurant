"use client"

import { useState } from "react"
import {
  Bell,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  Settings,
  Star,
  TrendingUp,
  Users,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle,
  Timer,
  ChefHat,
  Truck,
  Eye,
  ToggleLeft,
  ToggleRight,
  Cloud,
  Mountain,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function RestaurantDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("new")

  const currentTime = new Date().toLocaleTimeString("en-NZ", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
  const currentDate = new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const newOrders = [
    {
      id: "#ALP-001",
      customer: "Sarah Mitchell",
      phone: "+64 27 123 4567",
      time: "2 minutes ago",
      address: "Heritage Hotel - Room 24",
      items: [
        { name: "Green Lipped Mussel Pizza", qty: 1, price: 28.5 },
        { name: "Marlborough Sauvignon Blanc", qty: 1, price: 12.0 },
        { name: "Hokey Pokey Ice Cream", qty: 2, price: 8.5 },
      ],
      total: 49.0,
      instructions: "Extra cheese, deliver to hotel reception",
      landmark: "Near Thermal Pools",
    },
    {
      id: "#ALP-002",
      customer: "James Chen",
      phone: "+64 21 987 6543",
      time: "5 minutes ago",
      address: "Hillside Bach - 15 Forest View Road",
      items: [
        { name: "Beer Battered Fish & Chips", qty: 2, price: 22.0 },
        { name: "Coleslaw", qty: 1, price: 6.5 },
        { name: "L&P", qty: 2, price: 6.0 },
      ],
      total: 34.5,
      instructions: "Allergic to nuts - please ensure no cross contamination",
      landmark: "Mountain Bike Park Area",
    },
    {
      id: "#ALP-003",
      customer: "Emma Thompson",
      phone: "+64 22 456 7890",
      time: "8 minutes ago",
      address: "Holiday Park - Cabin 7",
      items: [
        { name: "Lamb Rack - Canterbury Style", qty: 1, price: 42.0 },
        { name: "Kumara Fries", qty: 1, price: 9.5 },
        { name: "Pinot Noir", qty: 1, price: 15.0 },
      ],
      total: 66.5,
      instructions: "Medium rare, extra spicy sauce on the side",
      landmark: "Forest Camps Area",
    },
  ]

  const preparingOrders = [
    {
      id: "#ALP-004",
      customer: "David Wilson",
      estimatedTime: "12 minutes",
      items: ["Venison Burger", "Craft Beer Selection"],
      total: 38.5,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-gray-900">
      {/* Header */}
      <header className="bg-[#2F5233] text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-[#CC5500]" />
              <div>
                <h1 className="text-xl font-bold">Alpine Delivery Co.</h1>
                <p className="text-sm text-green-200">Restaurant Dashboard</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-12 bg-green-400" />
            <div>
              <h2 className="text-lg font-semibold">Saints Cafe Restaurant & Bar</h2>
              <p className="text-sm text-green-200 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Hanmer Springs, NZ
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium">{currentTime}</p>
              <p className="text-xs text-green-200">{currentDate}</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">
                {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
              </span>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} className="data-[state=checked]:bg-[#CC5500]" />
              <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
            </div>

            <Button variant="outline" className="bg-white text-[#2F5233] hover:bg-gray-100">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-[#CC5500] border-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#2F5233] flex items-center">
                <Bell className="h-4 w-4 mr-2 text-[#CC5500]" />
                New Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#CC5500]">3</div>
              <Badge variant="destructive" className="mt-1">
                Urgent
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#2F5233] flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Orders Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600">+3 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#2F5233] flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$450 NZD</div>
              <p className="text-xs text-gray-600">Average: $37.50</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#2F5233] flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-gray-600">23 reviews today</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#2F5233]">Quick Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5 text-green-600" />
                <span className="font-medium">Kitchen: Normal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Delivery: On Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-[#CC5500]" />
                <span className="font-medium">Today: Busy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Weather: Clear</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Management */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#2F5233]">Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="new" className="data-[state=active]:bg-[#CC5500] data-[state=active]:text-white">
                  New Orders ({newOrders.length})
                </TabsTrigger>
                <TabsTrigger
                  value="preparing"
                  className="data-[state=active]:bg-[#CC5500] data-[state=active]:text-white"
                >
                  Preparing (1)
                </TabsTrigger>
                <TabsTrigger value="ready" className="data-[state=active]:bg-[#CC5500] data-[state=active]:text-white">
                  Ready (0)
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-[#CC5500] data-[state=active]:text-white"
                >
                  Completed (8)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="new" className="space-y-4 mt-4">
                {newOrders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-[#CC5500]">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-[#2F5233]">{order.id}</h3>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {order.time}
                            </Badge>
                          </div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {order.phone}
                          </p>
                          <p className="text-sm flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-[#CC5500]" />
                            {order.address}
                          </p>
                          <p className="text-xs text-gray-500 italic">{order.landmark}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-[#2F5233]">Order Items:</h4>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>
                                {item.qty}x {item.name}
                              </span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between font-bold">
                            <span>Total:</span>
                            <span className="text-[#CC5500]">${order.total.toFixed(2)} NZD</span>
                          </div>
                          {order.instructions && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                              <p className="text-xs font-medium text-yellow-800">Special Instructions:</p>
                              <p className="text-sm text-yellow-700">{order.instructions}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Accept Order
                          </Button>
                          <Button variant="destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline Order
                          </Button>
                          <Button variant="outline" className="border-[#2F5233] text-[#2F5233]">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Customer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="preparing" className="space-y-4 mt-4">
                {preparingOrders.map((order) => (
                  <Card key={order.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-lg text-[#2F5233]">{order.id}</h3>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-600">Items: {order.items.join(", ")}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="flex items-center text-blue-600">
                            <Timer className="h-4 w-4 mr-1" />
                            <span className="font-medium">{order.estimatedTime}</span>
                          </div>
                          <Button className="bg-[#CC5500] hover:bg-orange-600 text-white">Ready for Pickup</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="ready" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <Truck className="h-12 w-12 mx-auto mb-2" />
                  <p>No orders ready for pickup</p>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-4">
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                  <p>8 orders completed today</p>
                  <Button variant="outline" className="mt-2">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Menu Management */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#2F5233]">Menu Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pizza Available</span>
                  <ToggleRight className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fish & Chips Available</span>
                  <ToggleRight className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Special of the Day</span>
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline" className="w-full border-[#2F5233] text-[#2F5233]">
                  Edit Full Menu
                </Button>
                <Button variant="outline" className="w-full">
                  Mark Items Unavailable
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hanmer Springs Features */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#2F5233]">Local Delivery Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-[#CC5500]">Delivery Zones:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Town Center (5-10 min)</li>
                  <li>• Hillside Areas (10-15 min)</li>
                  <li>• Forest Camps (15-20 min)</li>
                  <li>• Holiday Parks (8-12 min)</li>
                </ul>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Season Status:</span>
                  <Badge className="bg-[#CC5500]">Peak Season</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Busy Period:</span>
                  <span className="text-sm">6-8 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Commission:</span>
                  <span className="text-sm font-bold text-[#2F5233]">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Bar */}
        <Card className="bg-[#2F5233] text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span className="text-sm">Sound Alerts:</span>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                    className="data-[state=checked]:bg-[#CC5500]"
                  />
                </div>
                <Separator orientation="vertical" className="h-6 bg-green-400" />
                <Button variant="ghost" className="text-white hover:bg-green-700">
                  <Settings className="h-4 w-4 mr-2" />
                  Business Hours
                </Button>
              </div>
              <Button variant="outline" className="bg-white text-[#2F5233] hover:bg-gray-100">
                Call Alpine Delivery Co. Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
