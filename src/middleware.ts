import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, NICKNAME } from './constants';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get(ACCESS_TOKEN)?.value;
  const nickname = request.cookies.get(NICKNAME)?.value || '';

  // 비로그인
  if (!isLoggedIn) {
    // 둘러보기 허용
    if (request.nextUrl.pathname === '/archive') {
      return NextResponse.next();
    }
    // 로그인 페이지 접근 허용
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
  }

  // 최초 로그인
  if (isLoggedIn && !nickname) {
    // 둘러보기 허용
    if (request.nextUrl.pathname === '/archive') {
      return NextResponse.next();
    }
    // 닉네임 설정 페이지 허용
    if (request.nextUrl.pathname === `/settings/profile/nickname`) {
      return NextResponse.next();
    }
    // 닉네임 설정 페이지로 이동
    return NextResponse.redirect(`${request.nextUrl.origin}/settings/profile/nickname`);
  }

  // 로그인
  if (isLoggedIn) {
    // 로그인 페이지 접근 불가
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(`${request.nextUrl.origin}/${nickname}`);
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(`${request.nextUrl.origin}/login`);
}

export const config = {
  matcher: ['/', '/create/:path*', '/settings/:path*', '/archive', '/login', '/feed'],
};
