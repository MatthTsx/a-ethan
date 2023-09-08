import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";

export const SearchRouter = createTRPCRouter({
  getQuizes: publicProcedure
    .input(z.object({contains: z.string()}))
    .query(({ctx, input}) => {
        const select = {
          Name: true,
          Description: true,
          id: true,
          tags : {select: {Tittle:true, id:true}},
          User: {select: {name: true, id: true}},
          Image: true
        }

        return ctx.prisma.quiz.findMany({
          where: {
              OR: [
                {Name: {...input, mode: 'insensitive'}},
                {Description: {...input, mode: 'insensitive'}},
                {User: {name: {...input, mode: 'insensitive'}}},
                {tags: {some: {Tittle:{...input, mode: 'insensitive'}}}}
            ]
          },
          take: 50,
          select
        })
    }),
});
