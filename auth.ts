import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Kakao from "next-auth/providers/kakao"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Kakao],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth
      const protectedPrefixes = ["/chat", "/pricing", "/payment"]
      const isProtected = protectedPrefixes.some((p) =>
        nextUrl.pathname.startsWith(p)
      )
      if (isProtected && !isLoggedIn) return false
      return true
    },
  },
})
