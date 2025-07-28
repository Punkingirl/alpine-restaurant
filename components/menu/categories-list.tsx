'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Utensils } from 'lucide-react';
import { MenuCategory } from '@/lib/menu';

interface CategoriesListProps {
  onCategorySelect?: (category: MenuCategory) => void;
  onAddCategory?: () => void;
  onEditCategory?: (category: MenuCategory) => void;
  onDeleteCategory?: (categoryId: string) => void;
}

export default function CategoriesList({
  onCategorySelect,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoriesListProps) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockCategories: MenuCategory[] = [
      {
        id: '1',
        name: 'Appetizers',
        description: 'Start your meal with our delicious appetizers',
        order: 1,
      },
      {
        id: '2',
        name: 'Main Courses',
        description: 'Our signature main dishes',
        order: 2,
      },
      {
        id: '3',
        name: 'Desserts',
        description: 'Sweet endings to your meal',
        order: 3,
      },
      {
        id: '4',
        name: 'Beverages',
        description: 'Refreshing drinks and cocktails',
        order: 4,
      },
    ];

    setCategories(mockCategories);
    setLoading(false);
  }, []);

  const handleCategoryClick = (category: MenuCategory) => {
    setSelectedCategory(category.id || null);
    onCategorySelect?.(category);
  };

  const handleEdit = (e: React.MouseEvent, category: MenuCategory) => {
    e.stopPropagation();
    onEditCategory?.(category);
  };

  const handleDelete = (e: React.MouseEvent, categoryId: string) => {
    e.stopPropagation();
    onDeleteCategory?.(categoryId);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Menu Categories</h2>
          <p className="text-gray-600">Manage your menu categories and organization</p>
        </div>
        <Button onClick={onAddCategory} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Categories Yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first menu category to start organizing your menu items.
            </p>
            <Button onClick={onAddCategory}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Category
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 mt-1">
                      {category.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleEdit(e, category)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(e, category.id!)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    Order: {category.order}
                  </Badge>
                  {category.image && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Utensils className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {categories.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Click on a category to view and manage its menu items</li>
            <li>• Use the edit button to modify category details</li>
            <li>• Reorder categories by updating the order number</li>
            <li>• Add images to make your categories more appealing</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Named export for compatibility
export { CategoriesList }; 