"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Phone, User } from "lucide-react";
import type { Order } from "@/types/order";

// Mock data - replace with real data later
const mockNewOrders: Order[] = [
  {
    id: "1",
    orderNumber: "#ORD-001",
    restaurantId: "rest-1",
    customerId: "cust-1",
    status: "new",
    items: [
      {
        id: "1",
        menuItemId: "item-1",
        name: "Margherita Pizza",
        quantity: 2,
        unitPrice: 18.5,
        totalPrice: 37.0,
      },
      {
        id: "2",
        menuItemId: "item-2",
        name: "Caesar Salad",
        quantity: 1,
        unitPrice: 12.0,
        totalPrice: 12.0,
      },
    ],
    subtotal: 49.0,
    deliveryFee: 3.5,
    tax: 6.13,
    total: 58.63,
    currency: "NZD",
    customer: {
      id: "cust-1",
      name: "John Smith",
      phone: "+64 21 123 4567",
      email: "john@example.com",
    },
    deliveryAddress: {
      street: "123 Main Street",
      city: "Hanmer Springs",
      postalCode: "7334",
      zone: "Central",
    },
    estimatedPreparationTime: 25,
    estimatedDeliveryTime: 35,
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    updatedAt: new Date(),
  },
  {
    id: "2",
    orderNumber: "#ORD-002",
    restaurantId: "rest-1",
    customerId: "cust-2",
    status: "new",
    items: [
      {
        id: "3",
        menuItemId: "item-3",
        name: "Beef Burger",
        quantity: 1,
        unitPrice: 16.0,
        totalPrice: 16.0,
      },
      {
        id: "4",
        menuItemId: "item-4",
        name: "Fries",
        quantity: 1,
        unitPrice: 6.5,
        totalPrice: 6.5,
      },
    ],
    subtotal: 22.5,
    deliveryFee: 3.5,
    tax: 2.81,
    total: 28.81,
    currency: "NZD",
    customer: {
      id: "cust-2",
      name: "Sarah Johnson",
      phone: "+64 21 987 6543",
    },
    deliveryAddress: {
      street: "456 Oak Avenue",
      city: "Hanmer Springs",
      postalCode: "7334",
      zone: "North",
    },
    estimatedPreparationTime: 20,
    estimatedDeliveryTime: 30,
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    updatedAt: new Date(),
  },
];

export function NewOrdersList() {
  const handleAcceptOrder = (orderId: string) => {
    // TODO: Implement order acceptance logic
    console.log("Accepting order:", orderId);
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

  return (
    <div className="space-y-4">
      {mockNewOrders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No new orders</p>
          </CardContent>
        </Card>
      ) : (
        mockNewOrders.map((order) => (
          <Card key={order.id} className="border-l-4 border-red-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                <Badge variant="destructive">New</Badge>
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
                    variant="outline"
                    size="sm"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    Accept Order
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
