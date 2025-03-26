import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Clear the HTTP-only cookie
    res.setHeader('Set-Cookie', [
      serialize('auth_token', '', {
        maxAge: -1,
        path: '/',
      }),
      serialize('user_id', '', {
        maxAge: -1,
        path: '/',
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
