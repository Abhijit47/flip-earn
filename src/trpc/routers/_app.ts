import { listingRouter } from '@/features/listing/server/routers';
import { userRouter } from '@/features/user/server/routers';
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),

  listings: listingRouter,
  users: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
