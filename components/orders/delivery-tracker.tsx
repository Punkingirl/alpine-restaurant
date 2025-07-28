'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Truck, Clock, Phone, Navigation, CheckCircle } from 'lucide-react';

interface DeliveryTrackerProps {
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  estimatedDeliveryTime: Date;
  driverName?: string;
  driverPhone?: string;
  currentStatus: 'picked_up' | 'in_transit' | 'delivered';
  onStatusUpdate?: (status: 'picked_up' | 'in_transit' | 'delivered') => void;
}

export default function DeliveryTracker({
  orderId,
  customerName,
  deliveryAddress,
  estimatedDeliveryTime,
  driverName,
  driverPhone,
  currentStatus,
  onStatusUpdate,
}: DeliveryTrackerProps) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const timeDiff = estimatedDeliveryTime.getTime() - now.getTime();
      const minutesRemaining = Math.floor(timeDiff / (1000 * 60));
      
      setTimeRemaining(Math.max(minutesRemaining, 0));
      setIsOverdue(minutesRemaining < 0);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [estimatedDeliveryTime]);

  const getStatusProgress = () => {
    switch (currentStatus) {
      case 'picked_up':
        return 33;
      case 'in_transit':
        return 66;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'picked_up':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'picked_up':
        return 'Picked Up';
      case 'in_transit':
        return 'In Transit';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 0) {
      return `${Math.abs(minutes)}m overdue`;
    }
    if (minutes < 60) {
      return `${minutes}m remaining`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m remaining`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Delivery Tracker
        </CardTitle>
        <CardDescription>
          Order #{orderId} - {customerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Delivery Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Progress</span>
            <span>{getStatusProgress()}%</span>
          </div>
          <Progress value={getStatusProgress()} className="h-2" />
          
          <div className="flex justify-between items-center">
            <Badge className={getStatusColor(currentStatus)}>
              {getStatusText(currentStatus)}
            </Badge>
            <div className="text-right">
              <div className="text-sm text-gray-600">Estimated Delivery</div>
              <div className="text-sm font-medium text-gray-900">
                {estimatedDeliveryTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Time Remaining */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Time Remaining</span>
            </div>
            <Badge variant={isOverdue ? 'destructive' : 'outline'}>
              {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <MapPin className="w-4 h-4" />
            Delivery Address
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">{deliveryAddress}</p>
          </div>
        </div>

        {/* Driver Information */}
        {driverName && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Truck className="w-4 h-4" />
              Driver Information
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Driver:</span>
                <span className="text-sm font-medium text-gray-900">{driverName}</span>
              </div>
              {driverPhone && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Phone:</span>
                  <span className="text-sm font-medium text-gray-900">{driverPhone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Navigation className="w-4 h-4" />
            Track on Map
          </Button>
          {driverPhone && (
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Driver
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Call Customer
          </Button>
        </div>

        {/* Status Update Buttons */}
        {currentStatus !== 'delivered' && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-sm font-medium text-gray-900">Update Status</h4>
            <div className="flex gap-2">
              {currentStatus === 'picked_up' && (
                <Button
                  size="sm"
                  onClick={() => onStatusUpdate?.('in_transit')}
                  className="flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Mark In Transit
                </Button>
              )}
              {currentStatus === 'in_transit' && (
                <Button
                  size="sm"
                  onClick={() => onStatusUpdate?.('delivered')}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Delivered
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Delivery Tips */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h5 className="font-medium text-yellow-900 mb-1">Delivery Tips</h5>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Call customer 5 minutes before arrival</li>
            <li>• Verify delivery address upon arrival</li>
            <li>• Check for special delivery instructions</li>
            <li>• Update status in real-time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

// Named export for compatibility
export { DeliveryTracker }; 