import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { profileRouter } from "./routers/profile";
import { SearchRouter } from "./routers/Search";
import { QuizRouter } from "./routers/Quiz";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  profile: profileRouter,
  search : SearchRouter,
  Quiz: QuizRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
