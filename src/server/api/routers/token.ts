import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { adminSchema, idSchema, userSchema } from "../types";

export const tokenRouter = createTRPCRouter({
  generateAdminToken: publicProcedure
    .input(adminSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.create({
        data: adminSchema.parse(input),
      });
    }),

  updateAdminToken: publicProcedure
    .input(idSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.update({
        where: { id: input.id },
        data: adminSchema.parse(input),
      });
    }),

  deleteAdminToken: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.delete({
        where: { id: input.id },
      });
    }),
  generateUserToken: publicProcedure
    .input(userSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.create({
        data: userSchema.parse(input),
      });
    }),

  updateUserToken: publicProcedure
    .input(idSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: { id: input.id },
        data: userSchema.parse(input),
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
