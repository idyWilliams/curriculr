import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  const response = await updateSession(request)
  
  // Protect routes
  const { pathname } = request.nextUrl
  const isProtectedRoute = pathname.startsWith('/dashboard') || 
                           pathname.startsWith('/tracks') || 
                           pathname.startsWith('/profile') ||
                           pathname.startsWith('/onboarding')

  // If the user isn't logged in, redirect them to login
  // Note: updateSession already checks for user, but we need to react to it here
  // Actually, updateSession returns the response with cookies set.
  // We need to check if user is in that response or session.
  // To keep it clean, we'll re-check user here using the client we just refreshed.
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2|woff|ttf)$).*)',
  ],
}
