import { userRoute } from "~/server/api/routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { challengeRouter } from "./routers/challenge";
import { adminRoute } from "./routers/admin";
import { submissionRouter } from "./routers/submission";
import { tokenRouter } from "./routers/token";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRoute,
  admin: adminRoute,
  challenge: challengeRouter,
  submission: submissionRouter,
  token: tokenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
