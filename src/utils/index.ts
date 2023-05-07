export const kakaoInit = () => {
  const kakao = window.Kakao;
  kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);

  return kakao;
};
