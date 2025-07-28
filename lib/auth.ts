import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyRestaurantCredentials } from "@/lib/restaurant-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "restaurant-credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const restaurant = await verifyRestaurantCredentials(credentials.email, credentials.password)

        if (restaurant) {
          return {
            id: restaurant.id,
            email: restaurant.email,
            name: restaurant.name,
            restaurantId: restaurant.id,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  // NEXTAUTH_SECRET or hard-coded dev fallback.
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret-change-me",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.restaurantId = user.restaurantId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.restaurantId = token.restaurantId as string
      }
      return session
    },
  },
}
