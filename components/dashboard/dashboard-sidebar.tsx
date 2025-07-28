"use client";

import { useState, useContext, createContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Menu,
  BarChart3,
  Settings,
  Mountain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Menu", href: "/dashboard/menu", icon: Menu },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const SidebarContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function useSidebar() {
  return useContext(SidebarContext);
}

export function DashboardSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function DashboardSidebar() {
  const ctx = useSidebar();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const open = ctx?.open ?? false;
  const setOpen = ctx?.setOpen ?? (() => {});

  // Don't render sidebar until mounted to avoid hydration mismatch
  if (!mounted) return null;

  // Sidebar classes
  const sidebarBase =
    "bg-[#2F5233] text-white transition-all duration-300 h-full z-50" +
    (collapsed ? " w-16" : " w-64");
  const sidebarMobile =
    "fixed top-0 left-0 h-full w-64 shadow-lg transform transition-transform duration-300 bg-[#2F5233] z-50 overflow-y-auto" +
    (open ? " translate-x-0" : " -translate-x-full");

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        className={
          "md:static md:block " + (isMobile ? sidebarMobile : sidebarBase)
        }
        style={{ display: open || !isMobile ? "block" : "none" }}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <img
                src="/alpine logo.png"
                alt="Alpine Delivery Logo"
                className="h-36 w-36 object-contain"
              />
              <div>
                <h1 className="text-lg font-bold">Alpine Delivery</h1>
                <p className="text-xs text-green-200">Restaurant Portal</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-green-700"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="mt-8">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#CC5500] text-white border-r-4 border-orange-300"
                    : "text-green-100 hover:bg-green-700 hover:text-white",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => isMobile && setOpen(false)}
              >
                <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
