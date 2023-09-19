import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { ...input },
        select: {
          name: true,
          image: true,
        },
      });
    }),

  getQuizes: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.quiz.findMany({
        where: {
          UserId: input.userId,
        },
        select: {
          Image: true,
          Name: true,
          id: true,
          tags: { take: 10, select: { Color: true, Tittle: true } },
          Description: true,
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    ),
});
