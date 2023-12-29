import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  idSchema,
  userLoginSchema,
  userSchema,
  userTokenGetSchema,
  userTokenSchema,
} from "../types";

export const userRoute = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany();
  }),

  getOne: publicProcedure.input(idSchema).query(async ({ input, ctx }) => {
    return await ctx.db.user.findUnique({
      where: idSchema.parse({ id: input.id }),
    });
  }),

  getIdOne: publicProcedure
    .input(userTokenSchema.pick({ email: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({
        where: userTokenSchema.parse({ email: input.email }),
      });
    }),

  getTokenOne: publicProcedure
    .input(userTokenGetSchema.pick({ token: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findFirst({
        where: userTokenGetSchema.parse({ token: input.token }),
      });
    }),

  loginUser: publicProcedure
    .input(userLoginSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findFirst({
        where: userLoginSchema.parse({
          email: input.email,
          password: input.password,
        }),
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
        where: idSchema.parse({ id: input.id }),
      });
    }),
});
