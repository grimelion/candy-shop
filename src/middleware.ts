import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the login page through without auth check
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next()
  }

  const token = request.cookies.get("admin_session")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ADMIN_SECRET)
    )
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*"],
}
