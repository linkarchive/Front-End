import {
  HOURS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
} from '@/constants';

/* eslint-disable no-console */
type CookieProps = {
  name: string;
  value: string;
  days?: number;
};

export const getCookie = (name: string): string | null => {
  if (typeof window !== 'undefined') {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);

      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
    } catch (error) {
      console.error('쿠키를 가져오는 중 오류가 발생했습니다:', error);
    }
  }
  return null;
};

export const setCookie = (name: string, value: string, days): void => {
  try {
    const date = new Date();
    date.setTime(
      date.getTime() +
        days * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND
    );
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  } catch (error) {
    console.error('쿠키를 설정하는 중 오류가 발생했습니다:', error);
  }
};

export const setCookies = (cookies: CookieProps[]): void => {
  cookies.forEach((cookie: CookieProps) => {
    setCookie(cookie.name, cookie.value, cookie.days);
  });
};

export const deleteAllCookies = (): void => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
};
