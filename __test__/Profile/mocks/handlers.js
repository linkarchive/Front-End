import { rest } from 'msw';
import { API_BASE_URL } from '@test/mocks/handlers';

export const handlers = [
  /** 프로필 조회 */
  rest.get(`${API_BASE_URL}/user`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        nickname: 'nickname test',
        introduce: 'introduce test',
        profileImage: 'test',
      })
    );
  }),

  /** 이미지 변경 */
  rest.patch(`${API_BASE_URL}/profile-image`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ profileImage: '/new-image.png' }));
  }),

  /** 로그아웃 */
  rest.post(`/api/delete-all-cookies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Success' }));
  }),

  /** 프로필 업데이트 */
  rest.patch(`${API_BASE_URL}/user`, (req, res, ctx) => {
    return res(ctx.json({ nickname: 'newNickname', introduce: 'newIntroduce' }));
  }),
];
