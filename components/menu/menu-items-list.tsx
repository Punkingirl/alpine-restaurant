'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { MenuItem } from '@/lib/menu';

interface MenuItemsListProps {
  onItemSelect?: (item: MenuItem) => void;
  onAddItem?: () => void;
  onEditItem?: (item: MenuItem) => void;
  onDeleteItem?: (itemId: string) => void;
  selectedCategory?: string;
}

export default function MenuItemsList({
  onItemSelect,
  onAddItem,
  onEditItem,
  onDeleteItem,
  selectedCategory,
}: MenuItemsListProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailable, setFilterAvailable] = useState<boolean | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockItems: MenuItem[] = [
      {
        id: '1',
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon butter sauce',
        price: 28.99,
        category: 'Main Courses',
        available: true,
        allergens: ['Fish', 'Dairy'],
      },
      {
        id: '2',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce with Caesar dressing, parmesan cheese, and croutons',
        price: 12.99,
        category: 'Appetizers',
        available: true,
        allergens: ['Dairy', 'Gluten'],
      },
      {
        id: '3',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
        price: 9.99,
        category: 'Desserts',
        available: true,
        allergens: ['Eggs', 'Dairy', 'Gluten'],
      },
      {
        id: '4',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 18.99,
        category: 'Main Courses',
        available: false,
        allergens: ['Dairy', 'Gluten'],
      },
    ];

    setItems(mockItems);
    setLoading(false);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    const matchesAvailability = filterAvailable === null || item.available === filterAvailable;
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleItemClick = (item: MenuItem) => {
    onItemSelect?.(item);
  };

  const handleEdit = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onEditItem?.(item);
  };

  const handleDelete = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    onDeleteItem?.(itemId);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Items</h2>
          <p className="text-gray-600">
            {selectedCategory ? `Items in ${selectedCategory}` : 'All menu items'}
          </p>
        </div>
        <Button onClick={onAddItem} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Item
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterAvailable === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterAvailable(null)}
          >
            All
          </Button>
          <Button
            variant={filterAvailable === true ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterAvailable(true)}
          >
            Available
          </Button>
          <Button
            variant={filterAvailable === false ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterAvailable(false)}
          >
            Unavailable
          </Button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Items Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterAvailable !== null
                ? 'Try adjusting your search or filters'
                : 'Start by adding your first menu item'}
            </p>
            {!searchTerm && filterAvailable === null && (
              <Button onClick={onAddItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Item
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                !item.available ? 'opacity-60' : ''
              }`}
              onClick={() => handleItemClick(item)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </CardTitle>
                      <Badge variant={item.available ? 'default' : 'secondary'}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      {item.category} • ${item.price.toFixed(2)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleEdit(e, item)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(e, item.id!)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                {item.allergens && item.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.allergens.map((allergen) => (
                      <Badge key={allergen} variant="outline" className="text-xs text-orange-600">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredItems.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          Showing {filteredItems.length} of {items.length} items
        </div>
      )}
    </div>
  );
}

// Named export for compatibility
export { MenuItemsList }; 