import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { idSchema, userLoginSchema, userSchema } from "../types";

export const userRoute = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: idSchema.parse(input),
    });
  }),

  loginUser: publicProcedure.input(userLoginSchema).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: userSchema.parse(input),
    });
  }),

  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),

  updateUser: publicProcedure
    .input(userSchema)
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: {
          id: input.id.toString(),
        },
        data: userSchema.parse(input),
      });
    }),

  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.delete({
        where: idSchema.parse(input),
      });
    }),
});
