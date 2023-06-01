import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, NICKNAME } from './constants';

export function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();

  const isLoggedIn = allCookies.find((cookie) => cookie.name === ACCESS_TOKEN)?.value;
  const nickname = allCookies.find((cookie) => cookie.name === NICKNAME)?.value || '';

  const response = NextResponse.next();

  if (isLoggedIn) {
    // 닉네임 설정 페이지로 이동 허용
    if (!nickname && request.nextUrl.pathname === '/settings/profile/setnickname') {
      return response;
    }
    // 닉네임 설정 페이지로 이동
    if (!nickname) {
      NextResponse.redirect(`${request.nextUrl.origin}/settings/profile/setnickname`);
      return response;
    }
    // 로그인 페이지 접근 불가
    if (request.nextUrl.pathname === '/login') {
      NextResponse.redirect(`${request.nextUrl.origin}/${nickname}`);
      return response;
    }

    return response;
  }

  NextResponse.redirect(`${request.nextUrl.origin}/login`);
  return response;
}

export const config = {
  matcher: ['/', '/create/:path*', '/settings/:path*', '/settings/profile/setnickname'],
};
