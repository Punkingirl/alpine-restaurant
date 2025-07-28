'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';

interface CustomerInfoProps {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  createdAt: Date;
  specialInstructions?: string;
}

export default function CustomerInfo({
  customerName,
  customerEmail,
  customerPhone,
  orderType,
  createdAt,
  specialInstructions,
}: CustomerInfoProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getOrderTypeColor = (type: string) => {
    switch (type) {
      case 'dine-in':
        return 'bg-blue-100 text-blue-800';
      case 'takeaway':
        return 'bg-green-100 text-green-800';
      case 'delivery':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Customer Information
        </CardTitle>
        <CardDescription>
          Customer details and order preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Customer Name</h4>
              <p className="text-gray-600">{customerName}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </h4>
              <p className="text-gray-600">{customerEmail}</p>
            </div>

            {customerPhone && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </h4>
                <p className="text-gray-600">{customerPhone}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Order Type</h4>
              <Badge className={getOrderTypeColor(orderType)}>
                {orderType.charAt(0).toUpperCase() + orderType.slice(1)}
              </Badge>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Order Date
              </h4>
              <p className="text-gray-600">{formatDate(createdAt)}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Order Time
              </h4>
              <p className="text-gray-600">
                {createdAt.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>

        {specialInstructions && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">Special Instructions</h4>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-gray-700 text-sm">{specialInstructions}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          {customerPhone && (
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Customer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 