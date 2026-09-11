import { z } from 'zod';

export const generateRequestSchema = z.object({
  type: z.enum(['chat', 'image', 'video', 'avatar', 'voice', 'code']),
  model: z.string().min(1),
  prompt: z.string().min(1).max(10000),
  systemPrompt: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().min(1).max(4000).optional(),
  imageUrl: z.string().url().optional(),
  vision: z.boolean().optional(),
  imageModel: z.enum(['sdxl', 'flux', 'sdxl-turbo']).optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  numOutputs: z.number().optional(),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
