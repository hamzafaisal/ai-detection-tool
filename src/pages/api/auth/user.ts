import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user ID from cookie
    const userId = req.cookies.auth_token || req.cookies.user_id;

    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, username: true }, // Don't include password
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('User fetch error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
