import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', `nickname=${req.body.nickname}; Path=/; HttpOnly; SameSite=Lax;`);
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
