import { ACCESS_TOKEN } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware is running');
  const accessToken = request.cookies.get(ACCESS_TOKEN);
  // home 페이지는 토큰이 없어도 접근 가능
  if (request.nextUrl.pathname.startsWith('/')) {
    return NextResponse.next();
  }
  // login 페이지는 토큰이 없어도 접근 가능
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // 토큰이 없는 경우 login 페이지로 리다이렉트
  if (!accessToken) {
    return NextResponse.redirect('/login');
  }

  // 토큰이 있는 경우 요청 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
