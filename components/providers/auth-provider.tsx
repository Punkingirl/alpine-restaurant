"use client"

import type { ReactNode } from "react"

/**
 * Stubbed AuthProvider for the browser preview.
 * It does NOT call next-auth, avoiding the `CLIENT_FETCH_ERROR`.
 *
 * When you deploy with a proper Node environment and NextAuth backend,
 * swap this stub back to:
 *
 *   import { SessionProvider } from "next-auth/react"
 *   export function AuthProvider({ children, session }) {
 *     return <SessionProvider session={session}>{children}</SessionProvider>
 *   }
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
