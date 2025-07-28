import type React from "react"
import { AlpineAuthHeader } from "@/components/auth/alpine-auth-header"
import { AlpineFooter } from "@/components/auth/alpine-footer"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-white flex flex-col">
      <AlpineAuthHeader />
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
      <AlpineFooter />
    </div>
  )
}
