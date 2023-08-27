import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const QuizRouter = createTRPCRouter({
  getQuizes: publicProcedure
    .input(z.object({contains: z.string()}))
    .query(({ctx, input}) => {
        return ctx.prisma.quiz.findMany({
          where: {
              OR: [
                {Name: {...input}},
                {Description: {...input}},
                {User: {name: {...input}}}
            ]
          },
        })
    }),
});
