"use client"

import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/toaster"

/**
 * Wraps the app with shadcn/ui <Toaster /> so any component
 * can call `toast({...})` without extra setup.
 * You can extend this later with a custom context if you need
 * more advanced notification logic.
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
