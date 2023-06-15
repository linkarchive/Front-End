import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      res.status(200).json({ refreshToken });
    } else {
      res.status(404).json({ message: 'Refresh Token Not Found' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
