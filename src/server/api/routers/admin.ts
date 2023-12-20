import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { idSchema, adminSchema, adminLoginSchema } from "../types";

export const adminRoute = createTRPCRouter({
  getAllAdmins: publicProcedure.query(({ ctx }) => {
    return ctx.db.admin.findMany();
  }),

  getOneAdmin: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    return ctx.db.admin.findUnique({
      where: idSchema.parse(input),
    });
  }),

  getIdAdmin: publicProcedure
    .input(adminSchema.pick({ email: true }))
    .query(({ input, ctx }) => {
      return ctx.db.admin.findUnique({
        where: adminSchema.parse(input),
      });
    }),

  loginAdmin: publicProcedure
    .input(adminLoginSchema)
    .query(({ input, ctx }) => {
      return ctx.db.user.findUnique({
        where: adminSchema.parse(input),
      });
    }),

  createAdmin: publicProcedure
    .input(adminSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.create({
        data: adminSchema.parse(input),
      });
    }),

  updateAdmin: publicProcedure
    .input(adminSchema)
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.update({
        where: {
          id: input.id,
        },
        data: adminSchema.parse(input),
      });
    }),

  deleteAdmin: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.admin.delete({
        where: idSchema.parse(input),
      });
    }),
});
