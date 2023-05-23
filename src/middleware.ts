import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN } from './constants';

export function middleware(request: NextRequest) {
  console.log('Middleware is running');
  const accessToken = request.cookies.get(ACCESS_TOKEN);
  const nickname = '1yoouoo';
  // 비로그인용 둘러보기 페이지 접근가능
  if (request.nextUrl.pathname === '/archive') {
    return NextResponse.next();
  }

  // 홈으로 이동 시
  if (request.nextUrl.pathname === '/') {
    // 토큰이 있다면 본인 계정의 홈으로 이동
    if (accessToken) {
      return NextResponse.redirect(`${request.nextUrl.origin}/${nickname}`);
    }
    // 토큰이 없다면 비로그인 홈으로 이동
    return NextResponse.next();
  }

  // 토큰이 없는 경우 login 페이지로 리다이렉트
  if (!accessToken) {
    console.log('권한 없음');
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  // 토큰이 있는 경우 요청 진행
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/create/:path*', '/archive/:path*', '/settings/:path*'],
};
