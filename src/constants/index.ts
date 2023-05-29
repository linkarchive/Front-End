const domain = process.env.NEXT_PUBLIC_DOMAIN;
const RedirectUri = `${domain}/auth/kakao`;
const ClientId = `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`;
const KakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${ClientId}&redirect_uri=${RedirectUri}&response_type=code`;
const ACCESS_TOKEN = 'accessToken';
const USER_ID = 'userId';
const DEBOUNCED_DELAY = 300;

export { KakaoAuthUrl, ACCESS_TOKEN, USER_ID, DEBOUNCED_DELAY };
