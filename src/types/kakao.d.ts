declare namespace Kakao {
  const init: (apiKey: string) => void;
  // 다른 카카오 API도 필요한 경우 추가해야함.
}

interface Window {
  Kakao: typeof Kakao;
}
