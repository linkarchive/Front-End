export const getCookie = (name) => {
  if (typeof window !== 'undefined') {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);

      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    } catch (error) {
      console.error('쿠키를 가져오는 중 오류가 발생했습니다:', error);
    }
  }
  return null;
};

export const setCookie = (name, value, days = 7) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  } catch (error) {
    console.error('쿠키를 가져오는 중 오류가 발생했습니다:', error);
  }
};
