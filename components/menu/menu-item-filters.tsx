'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface MenuItemFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availabilityFilter: 'all' | 'available' | 'unavailable';
  onAvailabilityChange: (filter: 'all' | 'available' | 'unavailable') => void;
  categories: string[];
}

export default function MenuItemFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  availabilityFilter,
  onAvailabilityChange,
  categories,
}: MenuItemFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('');
    onAvailabilityChange('all');
  };

  const hasActiveFilters = searchTerm || selectedCategory || availabilityFilter !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search menu items..."
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Availability</label>
              <div className="flex gap-2">
                <Button
                  variant={availabilityFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onAvailabilityChange('all')}
                >
                  All
                </Button>
                <Button
                  variant={availabilityFilter === 'available' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onAvailabilityChange('available')}
                >
                  Available
                </Button>
                <Button
                  variant={availabilityFilter === 'unavailable' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onAvailabilityChange('unavailable')}
                >
                  Unavailable
                </Button>
              </div>
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
              {selectedCategory && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {selectedCategory}
                  <button
                    onClick={() => onCategoryChange('')}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {availabilityFilter !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {availabilityFilter === 'available' ? 'Available' : 'Unavailable'} only
                  <button
                    onClick={() => onAvailabilityChange('all')}
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

// Named export for compatibility
export { MenuItemFilters }; 