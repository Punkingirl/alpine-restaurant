'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Package } from 'lucide-react';

interface OrdersAnalyticsProps {
  timeRange?: 'today' | 'week' | 'month' | 'year';
}

export default function OrdersAnalytics({ timeRange = 'week' }: OrdersAnalyticsProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  // Mock data for demonstration
  const analyticsData = {
    summary: {
      totalOrders: 156,
      totalRevenue: 2847.50,
      averageOrderValue: 18.25,
      completionRate: 94.2,
    },
    trends: {
      ordersGrowth: 12.5,
      revenueGrowth: 8.3,
      averageOrderGrowth: -2.1,
    },
    orderStatus: [
      { name: 'Completed', value: 147, color: '#10B981' },
      { name: 'Cancelled', value: 9, color: '#EF4444' },
    ],
    hourlyData: [
      { hour: '10:00', orders: 5, revenue: 87.50 },
      { hour: '11:00', orders: 8, revenue: 142.00 },
      { hour: '12:00', orders: 15, revenue: 267.50 },
      { hour: '13:00', orders: 12, revenue: 218.00 },
      { hour: '14:00', orders: 7, revenue: 125.50 },
      { hour: '15:00', orders: 4, revenue: 72.00 },
      { hour: '16:00', orders: 6, revenue: 108.00 },
      { hour: '17:00', orders: 9, revenue: 162.50 },
      { hour: '18:00', orders: 14, revenue: 248.00 },
      { hour: '19:00', orders: 11, revenue: 198.50 },
      { hour: '20:00', orders: 8, revenue: 145.00 },
      { hour: '21:00', orders: 3, revenue: 54.00 },
    ],
    categoryData: [
      { category: 'Main Courses', orders: 89, revenue: 1623.50 },
      { category: 'Appetizers', orders: 34, revenue: 442.00 },
      { category: 'Desserts', orders: 18, revenue: 162.00 },
      { category: 'Beverages', orders: 15, revenue: 120.00 },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders Analytics</h2>
          <p className="text-gray-600">Comprehensive analysis of your order performance</p>
        </div>
        <Select value={selectedTimeRange} onValueChange={(value: 'today' | 'week' | 'month' | 'year') => setSelectedTimeRange(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.summary.totalOrders}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">
                {formatPercentage(analyticsData.trends.ordersGrowth)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.summary.totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">
                {formatPercentage(analyticsData.trends.revenueGrowth)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.summary.averageOrderValue)}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              <span className="text-sm text-red-600">
                {formatPercentage(analyticsData.trends.averageOrderGrowth)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.summary.completionRate}%</p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2">
              <Badge variant="outline" className="text-green-600 border-green-300">
                Excellent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Orders by Hour</CardTitle>
            <CardDescription>Order volume throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Hour</CardTitle>
            <CardDescription>Revenue generation throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance by Category</CardTitle>
          <CardDescription>Orders and revenue breakdown by menu category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.categoryData.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{category.category}</h4>
                  <p className="text-sm text-gray-600">{category.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(category.revenue)}</p>
                  <p className="text-sm text-gray-600">
                    {((category.revenue / analyticsData.summary.totalRevenue) * 100).toFixed(1)}% of total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Distribution</CardTitle>
          <CardDescription>Breakdown of completed vs cancelled orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.orderStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 