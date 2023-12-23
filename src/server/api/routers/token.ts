import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { adminSchema, idSchema, userSchema } from "../types";

export const tokenRouter = createTRPCRouter({
  getAdminToken: publicProcedure
    .input(adminSchema.pick({ email: true }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.admin.findUnique({
        where: adminSchema.parse(input.email),
      });
    }),

  updateAdminToken: publicProcedure
    .input(idSchema)
    .input(adminSchema.pick({ token: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.update({
        where: { id: input.id },
        data: adminSchema.parse(input.token),
      });
    }),

  deleteAdminToken: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.delete({
        where: { id: input.id },
      });
    }),

  getUserToken: publicProcedure
    .input(userSchema.pick({ email: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({
        where: userSchema.parse(input.email),
      });
    }),

  updateUserToken: publicProcedure
    .input(idSchema)
    .input(userSchema.pick({ token: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: { id: input.id },
        data: userSchema.parse(input.token),
      });
    }),

  deleteUserToken: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});
