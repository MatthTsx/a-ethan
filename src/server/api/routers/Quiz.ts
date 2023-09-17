import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const QuizRouter = createTRPCRouter({
  createQuiz: protectedProcedure
    .input(z.object({
      Name: z.string(),
      desc: z.string(),
      img: z.string(),
      tags: z.array(z.string()),
      _UserId : z.string()
    }))
    .mutation(({ctx, input}) => {
      return ctx.prisma.quiz.create({
        data: {
          Description: input.desc,
          Name: input.Name,
          Image: input.img,
          User: {connect: {id: input._UserId}},
          tags: {
            connect: input.tags.map(t => ({id: t}))
          }
        },
        select: {id: true}
      })
    }),
  createTag: protectedProcedure
    .input(z.object({Color: z.string(), Tittle: z.string()}))
    .mutation(({ctx, input}) => (
      ctx.prisma.tags.create({
        data: {...input},
        select: { id: true, Color: true, Tittle: true }
      })
    )),
  getQuiz: publicProcedure
      .input(z.object({id: z.string(), userID: z.string()}))
      .query(({ctx, input}) => (
        ctx.prisma.quiz.findFirst({
          where: {id: input.id},
          select: {
            Description: true, tags: {select: {Tittle: true, Color: true}}, Image: true, Name: true,
            Questions: {select: {_count: true}}, Scores: {where: {UserId: input.userID}, select: {right: true}},
            User: {select: {name: true, image: true}}
          }
        })
      ))
});
