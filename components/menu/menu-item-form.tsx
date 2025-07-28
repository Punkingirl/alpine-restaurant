'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Loader2, X, Plus } from 'lucide-react';
import { MenuItem } from '@/lib/menu';

const menuItemSchema = z.object({
  name: z.string().min(2, 'Item name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  category: z.string().min(1, 'Please select a category'),
  available: z.boolean(),
  allergens: z.array(z.string()).optional(),
  nutritionalInfo: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    carbs: z.number().optional(),
    fat: z.number().optional(),
  }).optional(),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

interface MenuItemFormProps {
  item?: MenuItem;
  categories: string[];
  onSubmit: (data: MenuItemFormData) => Promise<void>;
  onCancel?: () => void;
}

export default function MenuItemForm({ item, categories, onSubmit, onCancel }: MenuItemFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [allergens, setAllergens] = useState<string[]>(item?.allergens || []);
  const [newAllergen, setNewAllergen] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price || 0,
      category: item?.category || '',
      available: item?.available ?? true,
      nutritionalInfo: item?.nutritionalInfo || {},
    },
  });

  const available = watch('available');

  const handleFormSubmit = async (data: MenuItemFormData) => {
    setIsLoading(true);
    try {
      const formData = {
        ...data,
        allergens: allergens.length > 0 ? allergens : undefined,
      };
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addAllergen = () => {
    if (newAllergen.trim() && !allergens.includes(newAllergen.trim())) {
      setAllergens([...allergens, newAllergen.trim()]);
      setNewAllergen('');
    }
  };

  const removeAllergen = (allergen: string) => {
    setAllergens(allergens.filter(a => a !== allergen));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAllergen();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {item ? 'Edit Menu Item' : 'Add New Menu Item'}
        </CardTitle>
        <CardDescription>
          {item ? 'Update the menu item details' : 'Create a new menu item for your restaurant'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="e.g., Grilled Salmon"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                {...register('category')}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe the item, ingredients, and preparation method"
              className={errors.description ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                placeholder="0.00"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Availability</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={available}
                  onCheckedChange={(checked) => setValue('available', checked)}
                />
                <Label htmlFor="available">
                  {available ? 'Available' : 'Unavailable'}
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Allergens</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newAllergen}
                  onChange={(e) => setNewAllergen(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add allergen (e.g., Nuts, Dairy)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAllergen}
                  disabled={!newAllergen.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {allergens.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {allergens.map((allergen) => (
                  <Badge key={allergen} variant="outline" className="flex items-center gap-1">
                    {allergen}
                    <button
                      type="button"
                      onClick={() => removeAllergen(allergen)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nutritional Information (Optional)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  {...register('nutritionalInfo.calories', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  step="0.1"
                  {...register('nutritionalInfo.protein', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  step="0.1"
                  {...register('nutritionalInfo.carbs', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  step="0.1"
                  {...register('nutritionalInfo.fat', { valueAsNumber: true })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {item ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                item ? 'Update Item' : 'Create Item'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 