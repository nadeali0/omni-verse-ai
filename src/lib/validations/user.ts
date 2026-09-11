import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
});

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  image: z.string().url().optional(),
});

export const updateBillingSchema = z.object({
  subscription: z.enum(['FREE', 'PRO', 'UNLIMITED']),
  stripeId: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateBillingInput = z.infer<typeof updateBillingSchema>;
