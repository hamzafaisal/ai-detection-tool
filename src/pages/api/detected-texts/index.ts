import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const userId = req.cookies.user_id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const texts = await prisma.detectedText.findMany({
        where: { userId: Number(userId) },
        orderBy: { created_at: 'desc' },
      });

      res.status(200).json(texts);
    } catch (error) {
      console.error('Error fetching detected texts:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const userId = req.cookies.user_id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { content, score, isAI } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }

      const text = await prisma.detectedText.create({
        data: {
          content,
          score,
          isAI,
          userId: Number(userId),
        },
      });

      res.status(201).json(text);
    } catch (error) {
      console.error('Error creating detected text:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
