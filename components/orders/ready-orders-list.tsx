"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, User, CheckCircle } from "lucide-react";
import type { Order } from "@/types/order";

// Mock data - replace with real data later
const mockReadyOrders: Order[] = [
  {
    id: "4",
    orderNumber: "#ORD-004",
    restaurantId: "rest-1",
    customerId: "cust-4",
    status: "ready",
    items: [
      {
        id: "8",
        menuItemId: "item-8",
        name: "Chicken Wings",
        quantity: 1,
        unitPrice: 15.0,
        totalPrice: 15.0,
      },
      {
        id: "9",
        menuItemId: "item-9",
        name: "Onion Rings",
        quantity: 1,
        unitPrice: 7.0,
        totalPrice: 7.0,
      },
      {
        id: "10",
        menuItemId: "item-10",
        name: "Sprite",
        quantity: 1,
        unitPrice: 4.5,
        totalPrice: 4.5,
      },
    ],
    subtotal: 26.5,
    deliveryFee: 3.5,
    tax: 3.31,
    total: 33.31,
    currency: "NZD",
    customer: {
      id: "cust-4",
      name: "Emma Davis",
      phone: "+64 21 777 8888",
    },
    deliveryAddress: {
      street: "321 Elm Street",
      city: "Hanmer Springs",
      postalCode: "7334",
      zone: "East",
    },
    estimatedPreparationTime: 25,
    estimatedDeliveryTime: 35,
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    updatedAt: new Date(),
    acceptedAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    preparingAt: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
    readyAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  },
];

export function ReadyOrdersList() {
  const handleMarkPickedUp = (orderId: string) => {
    // TODO: Implement mark as picked up logic
    console.log("Marking order as picked up:", orderId);
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
      {mockReadyOrders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No orders ready for pickup</p>
          </CardContent>
        </Card>
      ) : (
        mockReadyOrders.map((order) => (
          <Card key={order.id} className="border-l-4 border-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                <Badge className="bg-green-600 text-white">Ready</Badge>
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
                  <CheckCircle className="h-4 w-4" />
                  {order.readyAt && getTimeElapsed(order.readyAt)}
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
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                    onClick={() => handleMarkPickedUp(order.id)}
                  >
                    Mark Picked Up
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
