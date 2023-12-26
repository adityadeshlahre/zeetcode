import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  adminSchema,
  adminTokenSchema,
  idSchema,
  userSchema,
  userTokenSchema,
} from "../types";

export const tokenRouter = createTRPCRouter({
  getAdminToken: publicProcedure
    .input(adminTokenSchema.pick({ email: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.admin.findUnique({
        where: adminTokenSchema.parse({ email: input.email }),
      });
    }),

  updateAdminToken: publicProcedure
    .input(idSchema.pick({ id: true }))
    .input(adminSchema.pick({ token: true }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.admin.update({
        where: adminSchema.parse({ id: input.id }),
        data: adminSchema.parse(input.token),
      });
    }),

  deleteAdminToken: publicProcedure
    .input(idSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.admin.delete({
        where: adminSchema.parse({ id: input.id }),
      });
    }),

  getUserToken: publicProcedure
    .input(userTokenSchema.pick({ email: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.user.findUnique({
        where: userTokenSchema.parse({ email: input.email }),
      });
    }),

  updateUserToken: publicProcedure
    .input(idSchema.pick({ id: true }))
    .input(userSchema.pick({ token: true }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.update({
        where: { id: input.id },
        data: userSchema.parse(input.token),
      });
    }),

  deleteUserToken: publicProcedure
    .input(idSchema.pick({ id: true }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});
