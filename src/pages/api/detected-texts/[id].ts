import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    const userId = req.cookies.user_id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await prisma.detectedText.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Text deleted successfully' });
  } catch (error) {
    console.error('Error deleting detected text:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
