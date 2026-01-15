import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import z from 'zod';

export const userRouter = createTRPCRouter({
  updateProfile: protectedProcedure
    .input(
      z.object({
        bio: z.string().min(10).max(500).optional(),
        country: z.string().min(2).max(100).optional(),
        website: z.string().url().max(200).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const auth = ctx.auth;
      // Update user profile in the database
    }),

  // Other user-related procedures can be added here
});
