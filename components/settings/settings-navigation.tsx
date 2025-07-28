"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Truck,
  Clock,
  Settings as SettingsIcon,
} from "lucide-react";

const settingsLinks = [
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
    icon: User,
  },
  {
    name: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell,
  },
  {
    name: "Delivery",
    href: "/dashboard/settings/delivery",
    icon: Truck,
  },
  {
    name: "Hours",
    href: "/dashboard/settings/hours",
    icon: Clock,
  },
  {
    name: "General",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export function SettingsNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 mb-6">
      {settingsLinks.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href} passHref>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2 justify-start w-full",
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
