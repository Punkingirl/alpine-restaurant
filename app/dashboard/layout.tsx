import type React from "react";
import { DashboardSidebarProvider } from "@/components/dashboard/dashboard-sidebar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NotificationProvider } from "@/components/providers/notification-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <DashboardSidebarProvider>
        <div className="flex h-screen bg-[#F5F5DC]">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </DashboardSidebarProvider>
    </NotificationProvider>
  );
}
