"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Settings, BarChart3 } from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard/menu",
    icon: LayoutGrid,
  },
  {
    name: "Categories",
    href: "/dashboard/menu/categories",
    icon: List,
  },
  {
    name: "Items",
    href: "/dashboard/menu/items",
    icon: List,
  },
  {
    name: "Analytics",
    href: "/dashboard/menu/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/dashboard/menu/settings",
    icon: Settings,
  },
];

export function MenuNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} passHref>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={cn(
                "flex items-center gap-2",
                isActive
                  ? "bg-[#2F5233] text-white hover:bg-green-800"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
