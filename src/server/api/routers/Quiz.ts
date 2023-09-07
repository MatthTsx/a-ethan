import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const QuizRouter = createTRPCRouter({
  createQuiz: protectedProcedure
    .input(z.object({
      Name: z.string(),
      desc: z.string(),
      img: z.string(),
      _UserId : z.string()
    }))
    .mutation(({ctx, input}) => {
      return ctx.prisma.quiz.create({
        data: {
          Description: input.desc,
          Name: input.Name,
          Image: input.img,
          User: {connect: {id: input._UserId}}
        },
        select: {id: true}
      })
    })
});
