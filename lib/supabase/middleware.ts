import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // Skip Supabase middleware for static files and API routes that don't need auth
  if (
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/api/chat") ||
    request.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // If environment variables are not available, allow access without auth
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const protectedRoutes = ["/chat", "/dashboard", "/protected"]
    const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

    // Redirect to login only if accessing protected routes without authentication
    if (!user && isProtectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }

    if (user && request.nextUrl.pathname.startsWith("/auth")) {
      const url = request.nextUrl.clone()
      url.pathname = "/chat"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    // If auth check fails, allow access to continue
  }

  return supabaseResponse
}
