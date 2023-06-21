import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, value } = req.body;
    const encodedValue = encodeURIComponent(value);
    res.setHeader('Set-Cookie', `${name}=${encodedValue}; Path=/; HttpOnly; Secure; SameSite=Lax;`);
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
