"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, User, ChefHat } from "lucide-react";
import type { Order } from "@/types/order";

// Mock data - replace with real data later
const mockPreparingOrders: Order[] = [
  {
    id: "3",
    orderNumber: "#ORD-003",
    restaurantId: "rest-1",
    customerId: "cust-3",
    status: "preparing",
    items: [
      {
        id: "5",
        menuItemId: "item-5",
        name: "Pepperoni Pizza",
        quantity: 1,
        unitPrice: 20.0,
        totalPrice: 20.0,
      },
      {
        id: "6",
        menuItemId: "item-6",
        name: "Garlic Bread",
        quantity: 1,
        unitPrice: 8.0,
        totalPrice: 8.0,
      },
      {
        id: "7",
        menuItemId: "item-7",
        name: "Coke",
        quantity: 2,
        unitPrice: 4.5,
        totalPrice: 9.0,
      },
    ],
    subtotal: 37.0,
    deliveryFee: 3.5,
    tax: 4.63,
    total: 45.13,
    currency: "NZD",
    customer: {
      id: "cust-3",
      name: "Mike Wilson",
      phone: "+64 21 555 1234",
    },
    deliveryAddress: {
      street: "789 Pine Road",
      city: "Hanmer Springs",
      postalCode: "7334",
      zone: "South",
    },
    estimatedPreparationTime: 30,
    estimatedDeliveryTime: 40,
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    updatedAt: new Date(),
    acceptedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    preparingAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
  },
];

export function PreparingOrdersList() {
  const handleMarkReady = (orderId: string) => {
    // TODO: Implement mark as ready logic
    console.log("Marking order as ready:", orderId);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(amount);
  };

  const getTimeElapsed = (startTime: Date) => {
    const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000 / 60);
    return `${elapsed} min`;
  };

  return (
    <div className="space-y-4">
      {mockPreparingOrders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No orders being prepared</p>
          </CardContent>
        </Card>
      ) : (
        mockPreparingOrders.map((order) => (
          <Card key={order.id} className="border-l-4 border-yellow-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                <Badge className="bg-yellow-500 text-white">Preparing</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(order.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {order.customer.name}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {order.customer.phone}
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="h-4 w-4" />
                  {order.preparingAt && getTimeElapsed(order.preparingAt)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>{formatCurrency(item.totalPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>
                  {order.deliveryAddress.street}, {order.deliveryAddress.city}
                </span>
              </div>

              {order.specialInstructions && (
                <div className="text-sm">
                  <span className="font-medium">Special Instructions:</span>
                  <p className="text-muted-foreground mt-1">
                    {order.specialInstructions}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-lg font-semibold">
                    {formatCurrency(order.total)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="sm"
                    onClick={() => handleMarkReady(order.id)}
                  >
                    Mark Ready
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
