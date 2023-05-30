import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_TOKEN, NICKNAME } from './constants';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  const nickname = request.cookies.get(NICKNAME)?.value || '';

  // 닉네임이 없고 닉네임 설정 페이지로 이동하는 경우는 허용
  if (nickname === '' && request.nextUrl.pathname === '/settings/profile/setnickname') {
    return NextResponse.next();
  }

  // 로그인 상태에서 닉네임이 없는 경우 닉네임 설정 페이지로 리다이렉트
  if (accessToken && nickname === '') {
    return NextResponse.redirect(`${request.nextUrl.origin}/settings/profile/setnickname`);
  }

  // 로그인 페이지로 이동 시
  if (request.nextUrl.pathname === '/login') {
    // 토큰이 있다면 본인 계정의 홈으로 이동
    if (accessToken) {
      return NextResponse.redirect(`${request.nextUrl.origin}/${nickname}`);
    }
    // 토큰이 없다면 로그인 페이지로 진행
    return NextResponse.next();
  }

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
    return NextResponse.redirect(`${request.nextUrl.origin}/login`);
  }

  // 토큰이 있는 경우 요청 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/create/:path*',
    '/archive/:path*',
    '/settings/:path*',
    '/settings/profile/setnickname',
  ],
};
