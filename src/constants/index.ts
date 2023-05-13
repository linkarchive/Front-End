const domain = process.env.NEXT_PUBLIC_VERCEL_URL;
const RedirectUri = `${domain}/auth/kakao`;
const ClientId = `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`;
const KakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${ClientId}&redirect_uri=${RedirectUri}&response_type=code`;

export { KakaoAuthUrl };
