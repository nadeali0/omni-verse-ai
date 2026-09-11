import { prisma } from '@/lib/prisma';

export async function createUser(data: {
  email: string;
  name?: string;
  image?: string;
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      image: data.image,
      credits: 100,
      subscription: 'FREE',
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      generations: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
      files: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });
}

export async function updateUser(
  id: string,
  data: Partial<{
    name: string;
    image: string;
    subscription: string;
    credits: number;
    apiKeys: any;
  }>,
) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function updateCredits(userId: string, amount: number) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        increment: amount,
      },
    },
  });
}
