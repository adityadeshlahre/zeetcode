import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  idSchema,
  userLoginSchema,
  userSchema,
  userTokenSchema,
} from "../types";

export const userRoute = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  getOne: publicProcedure.input(idSchema).query(async ({ input, ctx }) => {
    return await ctx.db.user.findUnique({
      where: idSchema.parse(input),
    });
  }),

  getIdOne: publicProcedure
    .input(userTokenSchema.pick({ email: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({
        where: userTokenSchema.parse({ email: input.email }),
      });
    }),

  loginUser: publicProcedure
    .input(userLoginSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findFirst({
        where: userLoginSchema.parse(input),
      });
    }),

  createUser: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),

  updateUser: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.update({
        where: {
          id: input.id.toString(),
        },
        data: userSchema.parse(input),
      });
    }),

  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.delete({
        where: idSchema.parse(input),
      });
    }),
});
