import { parseCookies } from '@/utils';
import { GetServerSideProps } from 'next';

export const withAuth = (gssp?: GetServerSideProps) => {
  return async (ctx) => {
    const { nickname, userId, accessToken, refreshToken } = parseCookies(ctx.req.headers.cookie);
    const props = gssp ? await gssp({ ...ctx, nickname, userId, accessToken, refreshToken }) : {};

    return {
      props: {
        ...props,
        nickname: nickname || null,
        userId: userId || null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
      },
    };
  };
};
