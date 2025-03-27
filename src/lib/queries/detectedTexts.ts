import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DetectedText {
  id: number;
  content: string;
  score: number | null;
  isAI: boolean | null;
  userId: number;
  created_at: Date;
}

export async function getDetectedTexts(userId: number): Promise<{ success: boolean; data?: DetectedText[]; error?: string }> {
  try {
    const texts = await prisma.detectedText.findMany({
      where: { userId },
      orderBy: { created_at: 'desc' },
    });
    return { success: true, data: texts };
  } catch (error) {
    console.error('Error fetching detected texts:', error);
    return { success: false, error: 'Failed to fetch detected texts' };
  }
}

export async function createDetectedText(userId: number, content: string, score: number | null, isAI: boolean | null): Promise<{ success: boolean; data?: DetectedText; error?: string }> {
  try {
    const text = await prisma.detectedText.create({
      data: {
        content,
        score,
        isAI,
        userId,
      },
    });
    return { success: true, data: text };
  } catch (error) {
    console.error('Error creating detected text:', error);
    return { success: false, error: 'Failed to create detected text' };
  }
}

export async function deleteDetectedText(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.detectedText.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting detected text:', error);
    return { success: false, error: 'Failed to delete detected text' };
  }
}
