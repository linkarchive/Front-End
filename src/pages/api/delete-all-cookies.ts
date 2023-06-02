import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const cookies = req.headers.cookie?.split(';');
    const deleteCookies = [];

    if (cookies) {
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        deleteCookies.push(`${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`);
      }
    }

    res.setHeader('Set-Cookie', deleteCookies);
    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
