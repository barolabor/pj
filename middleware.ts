export { auth as middleware } from "@/auth"

export const config = {
  matcher: ["/chat/:path*", "/pricing/:path*", "/payment/:path*"],
}
