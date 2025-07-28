'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Truck, Phone } from 'lucide-react';

interface DeliveryInfoProps {
  deliveryAddress?: string;
  estimatedDeliveryTime?: Date;
  deliveryInstructions?: string;
  customerPhone?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
}

export default function DeliveryInfo({
  deliveryAddress,
  estimatedDeliveryTime,
  deliveryInstructions,
  customerPhone,
  orderType,
}: DeliveryInfoProps) {
  if (orderType !== 'delivery') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Pickup Information
          </CardTitle>
          <CardDescription>
            Customer pickup details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Customer Pickup
            </h3>
            <p className="text-gray-600">
              Customer will pick up their order at the restaurant
            </p>
            {estimatedDeliveryTime && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Ready by: {estimatedDeliveryTime.toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Delivery Information
        </CardTitle>
        <CardDescription>
          Delivery address and instructions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deliveryAddress && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </h4>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <p className="text-gray-700">{deliveryAddress}</p>
            </div>
          </div>
        )}

        {estimatedDeliveryTime && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Estimated Delivery Time
            </h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-700 border-green-300">
                {estimatedDeliveryTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Badge>
              <span className="text-sm text-gray-600">
                ({Math.round((estimatedDeliveryTime.getTime() - Date.now()) / (1000 * 60))} minutes)
              </span>
            </div>
          </div>
        )}

        {deliveryInstructions && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Delivery Instructions</h4>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-gray-700 text-sm">{deliveryInstructions}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            View on Map
          </Button>
          {customerPhone && (
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Customer
            </Button>
          )}
          <Button variant="outline" size="sm">
            Update Status
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-1">Delivery Tips</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Confirm address before delivery</li>
            <li>• Call customer 5 minutes before arrival</li>
            <li>• Check for special delivery instructions</li>
            <li>• Update delivery status in real-time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Named export for compatibility
export { DeliveryInfo }; 