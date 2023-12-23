import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { idSchema, challengeSchema } from "../types";

export const challengeRouter = createTRPCRouter({
  getAllChallenges: publicProcedure.query(({ ctx }) => {
    return ctx.db.challenge.findMany();
  }),

  getOneChallenge: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.challenge.findUnique({
      where: idSchema.parse(input),
    });
  }),

  createChallenge: publicProcedure
    .input(challengeSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.challenge.create({
        data: challengeSchema.parse(input),
      });
    }),

  updateChallenge: publicProcedure
    .input(challengeSchema)
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.challenge.update({
        where: {
          id: input.id,
        },
        data: challengeSchema.parse(input),
      });
    }),

  deleteChallenge: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.challenge.delete({
        where: idSchema.parse(input),
      });
    }),
});
