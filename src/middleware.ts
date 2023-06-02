import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, NICKNAME } from './constants';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get(ACCESS_TOKEN)?.value;
  const nickname = request.cookies.get(NICKNAME)?.value || '';
  console.log(`Access Token: ${isLoggedIn}`); // 로그 출력

  if (isLoggedIn) {
    // 닉네임 설정 페이지로 이동 허용
    if (!nickname && request.nextUrl.pathname === '/settings/profile/setnickname') {
      return NextResponse.next();
    }
    // 닉네임 설정 페이지로 이동
    if (!nickname) {
      return NextResponse.redirect(`${request.nextUrl.origin}/settings/profile/setnickname`);
    }
    // 로그인 페이지 접근 불가
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(`${request.nextUrl.origin}/${nickname}`);
    }

    return NextResponse.next();
  }
  return NextResponse.redirect(`${request.nextUrl.origin}/login`);
}

export const config = {
  matcher: ['/', '/create/:path*', '/settings/:path*', '/settings/profile/setnickname'],
};
