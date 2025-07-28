'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Loader2 } from 'lucide-react';
import MenuItemForm from './menu-item-form';

interface AddMenuItemButtonProps {
  categories: string[];
  onItemAdded?: (item: any) => void;
}

export default function AddMenuItemButton({ categories, onItemAdded }: AddMenuItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Here you would typically save to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onItemAdded?.(data);
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding menu item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Menu Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Menu Item</DialogTitle>
          <DialogDescription>
            Create a new menu item for your restaurant. Fill in all the required details.
          </DialogDescription>
        </DialogHeader>
        <MenuItemForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

// Named export for compatibility
export { AddMenuItemButton }; 