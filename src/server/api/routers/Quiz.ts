import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const QuizRouter = createTRPCRouter({
  createQuiz: protectedProcedure
    .input(
      z.object({
        Name: z.string(),
        desc: z.string(),
        img: z.string(),
        tags: z.array(z.string()),
        _UserId: z.string(),
        Questions: z.array(
          z.object({
            Answers: z.array(
              z.object({
                value: z.number(),
                Text: z.string(),
              })
            ),
            Correct: z.number(),
            Text: z.string(),
          })
        ),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.quiz.create({
        data: {
          Description: input.desc,
          Name: input.Name,
          Image: input.img,
          User: { connect: { id: input._UserId } },
          tags: {
            connect: input.tags.map((t) => ({ id: t })),
          },
          Questions: {
            create: input.Questions.map((Q) => ({
              Correct: Q.Correct,
              Text: Q.Text,
              Answers: {
                create: Q.Answers.map((A) => ({
                  value: A.value,
                  Text: A.Text,
                })),
              },
            })),
          },
        },
        select: { id: true },
      });
    }),
  createTag: protectedProcedure
    .input(z.object({ Color: z.string(), Tittle: z.string() }))
    .mutation(({ ctx, input }) =>
      ctx.prisma.tags.create({
        data: { ...input },
        select: { id: true, Color: true, Tittle: true },
      })
    ),
  getQuiz: publicProcedure
    .input(z.object({ id: z.string(), userID: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.quiz.findFirst({
        where: { id: input.id },
        select: {
          Description: true,
          tags: { select: { Tittle: true, Color: true } },
          Image: true,
          Name: true,
          Questions: { select: { _count: true } },
          Scores: { where: { UserId: input.userID }, select: { right: true } },
          User: { select: { name: true, image: true, id: true } },
        },
      })
    ),
  getQuestions: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.question.findMany({
        where: {
          QuizId: input.id,
        },
        select: {
          Answers: true,
          Correct: false,
          id: true,
          Text: true,
        },
      })
    ),

  getCorrect: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      try {
        return ctx.prisma.question.findFirst({
          where: { id: input.id == "" ? "6508addd8a3c1fea42383f13" : input.id },
          select: { Correct: true, id: true },
        });
      } catch (error) {}
    }),

  addScore: protectedProcedure
    .input(z.object({ userID: z.string(), QuizID: z.string() }))
    .mutation(({ ctx, input }) => {
      ctx.prisma.score
        .update({
          where: {
            QuizId_UserId: {
              QuizId: input.QuizID,
              UserId: input.userID,
            },
          },
          data: { right: { increment: 1 } },
        })
        .catch((error) => console.log(error));
    }),

  resetScore: protectedProcedure
    .input(z.object({ UserId: z.string(), QuizId: z.string() }))
    .mutation(({ ctx, input }) => {
      ctx.prisma.score
        .update({
          where: { QuizId_UserId: { ...input } },
          data: { right: 0 },
        })
        .catch((error) => console.log(error));
    }),
});
