import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/lib/queries/users';

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

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Register the user
    const result = await registerUser(username, password);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    // Return the user data without password
    return res.status(201).json({
      id: result.user?.id,
      username: result.user?.username,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
