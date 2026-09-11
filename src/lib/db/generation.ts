import { prisma } from '@/lib/prisma';

export async function createGeneration(data: {
  userId: string;
  type: string;
  model: string;
  prompt: string;
  result?: string;
  creditsUsed: number;
}) {
  return prisma.generation.create({
    data,
  });
}

export async function getUserGenerations(
  userId: string,
  limit: number = 10,
) {
  return prisma.generation.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export async function getGenerationById(id: string) {
  return prisma.generation.findUnique({
    where: { id },
  });
}

export async function deleteGeneration(id: string) {
  return prisma.generation.delete({
    where: { id },
  });
}
