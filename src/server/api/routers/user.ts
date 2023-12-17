import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const userSchema = z.object({
  username: z.string().min(6).max(10),
  name: z.string(),
  profilePicture: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const userRoute = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),

  getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.user.findUnique({
      where: idSchema.parse(input),
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
