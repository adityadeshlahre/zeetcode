import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { idTokenSchema, tokenSchema } from "../types";

export const submissionRouter = createTRPCRouter({
  generateToken: publicProcedure
    .input(tokenSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.token.create({
        data: tokenSchema.parse(input),
      });
    }),

  updateToken: publicProcedure
    .input(tokenSchema)
    .input(idTokenSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.token.update({
        where: { id: input.id },
        data: tokenSchema.parse(input),
      });
    }),

  deleteToken: publicProcedure
    .input(tokenSchema)
    .input(idTokenSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.token.delete({
        where: { id: input.id },
      });
    }),
});
