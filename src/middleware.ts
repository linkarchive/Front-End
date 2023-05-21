import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN } from './constants';

export function middleware(request: NextRequest) {
  console.log('Middleware is running');
  const accessToken = request.cookies.get(ACCESS_TOKEN);

  // 토큰이 없는 경우 login 페이지로 리다이렉트
  if (!accessToken) {
    console.log('권한 없음');
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  // 토큰이 있는 경우 요청 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/create/:path*', '/explore/:path*', '/user/:path*'],
};
