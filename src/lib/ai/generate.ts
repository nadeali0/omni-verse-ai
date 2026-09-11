import { prisma } from '@/lib/prisma';
import { OmniEngine } from '@/lib/ai/omni-engine';

export async function getUserApiKeys(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { apiKeys: true },
  });

  return user?.apiKeys || {};
}

export async function generateWithFallback(
  userId: string,
  type: string,
  model: string,
  prompt: string,
  options?: any,
) {
  const apiKeys = await getUserApiKeys(userId);
  const engine = new OmniEngine(apiKeys as any);

  if (type === 'chat') {
    return engine.generateChat(model as any, prompt, options);
  } else if (type === 'image') {
    return engine.generateImage(prompt, options);
  } else if (type === 'video') {
    return engine.generateVideo(prompt, options);
  }

  throw new Error(`Unsupported generation type: ${type}`);
}
