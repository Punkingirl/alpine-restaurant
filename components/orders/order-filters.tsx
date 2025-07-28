'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar, Clock } from 'lucide-react';

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: 'all' | 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  onStatusChange: (status: 'all' | 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled') => void;
  orderTypeFilter: 'all' | 'dine-in' | 'takeaway' | 'delivery';
  onOrderTypeChange: (type: 'all' | 'dine-in' | 'takeaway' | 'delivery') => void;
  dateFilter: string;
  onDateChange: (date: string) => void;
}

export default function OrderFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  orderTypeFilter,
  onOrderTypeChange,
  dateFilter,
  onDateChange,
}: OrderFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onOrderTypeChange('all');
    onDateChange('');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || orderTypeFilter !== 'all' || dateFilter;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search orders by customer name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              Active
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Order Status</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === 'preparing' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('preparing')}
                >
                  Preparing
                </Button>
                <Button
                  variant={statusFilter === 'ready' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('ready')}
                >
                  Ready
                </Button>
                <Button
                  variant={statusFilter === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('completed')}
                >
                  Completed
                </Button>
                <Button
                  variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange('cancelled')}
                >
                  Cancelled
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Order Type</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={orderTypeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onOrderTypeChange('all')}
                >
                  All
                </Button>
                <Button
                  variant={orderTypeFilter === 'dine-in' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onOrderTypeChange('dine-in')}
                >
                  Dine-in
                </Button>
                <Button
                  variant={orderTypeFilter === 'takeaway' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onOrderTypeChange('takeaway')}
                >
                  Takeaway
                </Button>
                <Button
                  variant={orderTypeFilter === 'delivery' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onOrderTypeChange('delivery')}
                >
                  Delivery
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {statusFilter !== 'all' && (
                <Badge className={`flex items-center gap-1 ${getStatusColor(statusFilter)}`}>
                  Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <button
                    onClick={() => onStatusChange('all')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {orderTypeFilter !== 'all' && (
                <Badge className={`flex items-center gap-1 ${getOrderTypeColor(orderTypeFilter)}`}>
                  Type: {orderTypeFilter.charAt(0).toUpperCase() + orderTypeFilter.slice(1)}
                  <button
                    onClick={() => onOrderTypeChange('all')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {dateFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Date: {dateFilter}
                  <button
                    onClick={() => onDateChange('')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 