import { NextApiRequest, NextApiResponse } from 'next';
import { loginUser } from '@/lib/queries/users';
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
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Authenticate the user
    const result = await loginUser(username, password);

    if (!result.success) {
      return res.status(401).json({ error: result.message });
    }

    // Set HTTP-only cookie for additional security
    // This is in addition to the js-cookie we use in the client for easier access
    res.setHeader('Set-Cookie', serialize('auth_token', String(result.user?.id), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    }));

    // Return the user data without password
    return res.status(200).json({
      id: result.user?.id,
      username: result.user?.username,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
