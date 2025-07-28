"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  MoreHorizontal,
  Utensils,
  Eye,
  EyeOff,
} from "lucide-react";
import type { MenuCategory } from "@/types/menu";

// Mock data - replace with real data later
const mockCategories: MenuCategory[] = [
  {
    id: "1",
    restaurantId: "rest-1",
    name: "Pizzas",
    description: "Fresh-baked pizzas with premium toppings",
    sortOrder: 1,
    isActive: true,
    items: [
      {
        id: "1",
        restaurantId: "rest-1",
        categoryId: "1",
        name: "Margherita Pizza",
        description: "Classic tomato sauce with mozzarella and basil",
        price: 18.5,
        currency: "NZD",
        isAvailable: true,
        isPopular: true,
        preparationTime: 20,
        allergens: ["dairy", "gluten"],
        dietaryInfo: ["vegetarian"],
        images: [],
        modifiers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        restaurantId: "rest-1",
        categoryId: "1",
        name: "Pepperoni Pizza",
        description: "Spicy pepperoni with melted cheese",
        price: 20.0,
        currency: "NZD",
        isAvailable: true,
        isPopular: true,
        preparationTime: 22,
        allergens: ["dairy", "gluten", "pork"],
        dietaryInfo: [],
        images: [],
        modifiers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "2",
    restaurantId: "rest-1",
    name: "Burgers",
    description: "Juicy beef burgers with fresh ingredients",
    sortOrder: 2,
    isActive: true,
    items: [
      {
        id: "3",
        restaurantId: "rest-1",
        categoryId: "2",
        name: "Classic Beef Burger",
        description: "100% beef patty with lettuce, tomato, and cheese",
        price: 16.0,
        currency: "NZD",
        isAvailable: true,
        isPopular: false,
        preparationTime: 15,
        allergens: ["dairy", "gluten", "beef"],
        dietaryInfo: [],
        images: [],
        modifiers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "3",
    restaurantId: "rest-1",
    name: "Sides",
    description: "Delicious side dishes and appetizers",
    sortOrder: 3,
    isActive: true,
    items: [
      {
        id: "4",
        restaurantId: "rest-1",
        categoryId: "3",
        name: "Garlic Bread",
        description: "Fresh bread with garlic butter and herbs",
        price: 8.0,
        currency: "NZD",
        isAvailable: true,
        isPopular: false,
        preparationTime: 8,
        allergens: ["dairy", "gluten"],
        dietaryInfo: ["vegetarian"],
        images: [],
        modifiers: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

export function MenuCategories() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
    }).format(amount);
  };

  const getAvailableItemsCount = (category: MenuCategory) => {
    return category.items.filter((item) => item.isAvailable).length;
  };

  const getPopularItemsCount = (category: MenuCategory) => {
    return category.items.filter((item) => item.isPopular).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2F5233]">Menu Categories</h2>
        <Button className="bg-[#2F5233] hover:bg-green-800 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-[#2F5233]" />
                    {category.name}
                  </CardTitle>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Items</span>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    {getAvailableItemsCount(category)} available
                  </Badge>
                  {getPopularItemsCount(category) > 0 && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {getPopularItemsCount(category)} popular
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {category.items.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      {item.isAvailable ? (
                        <Eye className="h-3 w-3 text-green-600" />
                      ) : (
                        <EyeOff className="h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={
                          !item.isAvailable
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {item.name}
                      </span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                ))}
                {category.items.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{category.items.length - 3} more items
                  </p>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
