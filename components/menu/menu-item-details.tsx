'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Edit, Trash2, Utensils, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { MenuItem } from '@/lib/menu';

interface MenuItemDetailsProps {
  itemId: string;
  onEdit?: (item: MenuItem) => void;
  onDelete?: (itemId: string) => void;
}

export default function MenuItemDetails({ itemId, onEdit, onDelete }: MenuItemDetailsProps) {
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockItem: MenuItem = {
      id: itemId,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon butter sauce',
      price: 28.99,
      category: 'Main Courses',
      available: true,
      allergens: ['Fish', 'Dairy'],
      nutritionalInfo: {
        calories: 450,
        protein: 35,
        carbs: 8,
        fat: 22,
      },
    };

    setItem(mockItem);
    setLoading(false);
  }, [itemId]);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </CardContent>
      </Card>
    );
  }

  if (!item) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Item Not Found
            </h3>
            <p className="text-gray-600">
              The menu item you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {item.name}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-1">
                {item.category}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit?.(item)}
                className="flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete?.(item.id!)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <Badge variant={item.available ? 'default' : 'secondary'}>
              {item.available ? 'Available' : 'Unavailable'}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600">{item.description}</p>
          </div>

          {item.allergens && item.allergens.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Allergens</h4>
              <div className="flex flex-wrap gap-2">
                {item.allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline" className="text-orange-600">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {item.nutritionalInfo && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Nutritional Information</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {item.nutritionalInfo.calories}
                  </div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {item.nutritionalInfo.protein}g
                  </div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {item.nutritionalInfo.carbs}g
                  </div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-lg font-bold text-gray-900">
                    {item.nutritionalInfo.fat}g
                  </div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Item Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Orders Today</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.8</div>
              <div className="text-sm text-gray-600">Customer Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 