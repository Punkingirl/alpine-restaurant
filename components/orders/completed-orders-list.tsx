"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, User, CheckCircle } from "lucide-react";
import type { Order } from "@/types/order";

// Mock data - replace with real data later
const mockCompletedOrders: Order[] = [
  {
    id: "5",
    orderNumber: "#ORD-005",
    restaurantId: "rest-1",
    customerId: "cust-5",
    status: "delivered",
    items: [
      {
        id: "11",
        menuItemId: "item-11",
        name: "BBQ Chicken Pizza",
        quantity: 1,
        unitPrice: 22.0,
        totalPrice: 22.0,
      },
      {
        id: "12",
        menuItemId: "item-12",
        name: "Mozzarella Sticks",
        quantity: 1,
        unitPrice: 9.0,
        totalPrice: 9.0,
      },
      {
        id: "13",
        menuItemId: "item-13",
        name: "Lemonade",
        quantity: 1,
        unitPrice: 4.5,
        totalPrice: 4.5,
      },
    ],
    subtotal: 35.5,
    deliveryFee: 3.5,
    tax: 4.44,
    total: 43.44,
    currency: "NZD",
    customer: {
      id: "cust-5",
      name: "David Brown",
      phone: "+64 21 999 0000",
    },
    deliveryAddress: {
      street: "654 Maple Drive",
      city: "Hanmer Springs",
      postalCode: "7334",
      zone: "West",
    },
    estimatedPreparationTime: 28,
    estimatedDeliveryTime: 38,
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    updatedAt: new Date(),
    acceptedAt: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
    preparingAt: new Date(Date.now() - 52 * 60 * 1000), // 52 minutes ago
    readyAt: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    pickedUpAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    deliveredAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
  {
    id: "6",
    orderNumber: "#ORD-006",
    restaurantId: "rest-1",
    customerId: "cust-6",
    status: "picked_up",
    items: [
      {
        id: "14",
        menuItemId: "item-14",
        name: "Veggie Supreme Pizza",
        quantity: 1,
        unitPrice: 19.0,
        totalPrice: 19.0,
      },
      {
        id: "15",
        menuItemId: "item-15",
        name: "Greek Salad",
        quantity: 1,
        unitPrice: 13.0,
        totalPrice: 13.0,
      },
    ],
    subtotal: 32.0,
    deliveryFee: 3.5,
    tax: 4.0,
    total: 39.5,
    currency: "NZD",
    customer: {
      id: "cust-6",
      name: "Lisa Anderson",
      phone: "+64 21 111 2222",
    },
    deliveryAddress: {
      street: "987 Cedar Lane",
      city: "Hanmer Springs",
      postalCode: "7334",
      zone: "Central",
    },
    estimatedPreparationTime: 22,
    estimatedDeliveryTime: 32,
    createdAt: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
    updatedAt: new Date(),
    acceptedAt: new Date(Date.now() - 85 * 60 * 1000), // 85 minutes ago
    preparingAt: new Date(Date.now() - 82 * 60 * 1000), // 82 minutes ago
    readyAt: new Date(Date.now() - 65 * 60 * 1000), // 65 minutes ago
    pickedUpAt: new Date(Date.now() - 60 * 60 * 1000), // 60 minutes ago
  },
];

export function CompletedOrdersList() {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-NZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-600 text-white">Delivered</Badge>;
      case "picked_up":
        return <Badge className="bg-blue-600 text-white">Picked Up</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {mockCompletedOrders.length === 0 ? (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">No completed orders</p>
          </CardContent>
        </Card>
      ) : (
        mockCompletedOrders.map((order) => (
          <Card key={order.id} className="border-l-4 border-gray-400">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                {getStatusBadge(order.status)}
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
                  {order.status === "delivered" &&
                    order.deliveredAt &&
                    formatTime(order.deliveredAt)}
                  {order.status === "picked_up" &&
                    order.pickedUpAt &&
                    formatTime(order.pickedUpAt)}
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
                <div className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
