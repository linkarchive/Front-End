import { rest } from 'msw';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handlers = [
  // 샘플 코드
  rest.get(`${API_BASE_URL}/가로챌 엔드포인트 작성`, (req, res, ctx) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          title: '여행',
        },
        {
          id: 2,
          title: '갑시다',
        },
      ])
    );
  }),

  // POST /delete-all-cookies 요청에 대한 핸들러 추가
  rest.post(`/api/delete-all-cookies`, (req, res, ctx) => {
    // 요청을 받으면 200 OK 응답을 반환합니다.
    return res(ctx.status(200), ctx.json({ message: 'Success' }));
  }),
];
