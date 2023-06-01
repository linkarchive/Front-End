const domain = process.env.NEXT_PUBLIC_DOMAIN;
const RedirectUri = `${domain}/auth/kakao`;
const ClientId = `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`;
const KakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${ClientId}&redirect_uri=${RedirectUri}&response_type=code`;
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const USER_ID = 'userId';
const NICKNAME = 'nickname';
const DEBOUNCED_DELAY = 300;
const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECOND = 1000;

export {
  domain,
  KakaoAuthUrl,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  DEBOUNCED_DELAY,
  USER_ID,
  NICKNAME,
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND,
};
