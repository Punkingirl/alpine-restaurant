"use client";

import { useState, useEffect } from "react";
import { MapPin, Wifi, WifiOff, Menu as MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./dashboard-sidebar";

export function DashboardHeader() {
  const [isOnline, setIsOnline] = useState(true);
  const [time, setTime] = useState<string>(() =>
    new Date().toLocaleTimeString("en-NZ", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
  const date = new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const sidebar = useSidebar();

  // Update clock every minute
  useEffect(() => {
    const id = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-NZ", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex items-center justify-between bg-[#2F5233] px-4 py-2 text-white shadow-sm">
      <div className="flex items-center space-x-4">
        {/* Hamburger menu for mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={() => sidebar?.setOpen(true)}
          aria-label="Open sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <h1 className="text-lg font-bold">Restaurant Dashboard</h1>
        <span className="flex items-center text-sm text-green-200">
          <MapPin className="mr-1 h-4 w-4" />
          Hanmer Springs, NZ
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right leading-none">
          <p className="text-sm font-medium">{time}</p>
          <p className="text-xs text-green-200">{date}</p>
        </div>

        <Button
          variant="ghost"
          className="text-white hover:bg-green-700"
          onClick={() => setIsOnline(!isOnline)}
        >
          {isOnline ? (
            <Wifi className="h-5 w-5" />
          ) : (
            <WifiOff className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
