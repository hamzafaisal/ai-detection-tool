import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('user_id')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  const isPublicRoute = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/pricing';
  const isAiDetectionPage = request.nextUrl.pathname.startsWith('/ai-detection');
  const isLoginPage = request.nextUrl.pathname === '/auth/login';
  const isRegisterPage = request.nextUrl.pathname === '/auth/register';

  // If user is not authenticated and trying to access a protected route
  if (!userId && !isAuthPage && !isApiAuthRoute && !isPublicRoute && !isAiDetectionPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If user is authenticated and trying to access login or register pages
  if (userId && (isLoginPage || isRegisterPage)) {
    return NextResponse.redirect(new URL('/ai-detection', request.url));
  }

  // If user is not authenticated and trying to access AI Detection page
  if (!userId && isAiDetectionPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)'],
};
