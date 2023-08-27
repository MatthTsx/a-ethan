import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({id: z.string()}))
    .query(({ctx, input}) => {
        return ctx.prisma.user.findUnique({
          where:{...input},
          select:{
            name: true, image: true
          }
        })
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
