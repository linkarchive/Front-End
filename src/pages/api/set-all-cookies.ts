import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      `accessToken=${req.body.accessToken}; Path=/; HttpOnly; SameSite=Lax;`,
      `refreshToken=${req.body.refreshToken}; Path=/; HttpOnly; SameSite=Lax;`,
      `userId=${req.body.userId}; Path=/; HttpOnly; SameSite=Lax;`,
      `nickname=${req.body.nickname}; Path=/; HttpOnly; SameSite=Lax;`,
    ]);
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
