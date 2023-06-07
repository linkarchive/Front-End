type CookieObject = { [key: string]: string };
export const parseCookies = (cookie = ''): CookieObject => {
  if (!cookie) {
    return {};
  }

  return cookie.split(';').reduce((res, item) => {
    const [key, value] = item.split('=');
    res[key.trim()] = value;
    return res;
  }, {});
};
