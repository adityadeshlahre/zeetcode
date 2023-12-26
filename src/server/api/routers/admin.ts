import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  idSchema,
  adminSchema,
  adminLoginSchema,
  adminTokenSchema,
} from "../types";

export const adminRoute = createTRPCRouter({
  getAllAdmins: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.admin.findMany();
  }),

  getOneAdmin: publicProcedure.input(idSchema).query(async ({ input, ctx }) => {
    return await ctx.db.admin.findUnique({
      where: idSchema.parse(input),
    });
  }),

  getIdAdmin: publicProcedure
    .input(adminTokenSchema.pick({ email: true }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.admin.findUnique({
        where: adminTokenSchema.parse({ email: input.email }),
      });
    }),

  loginAdmin: publicProcedure
    .input(adminLoginSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.db.admin.findUnique({
        where: adminLoginSchema.parse({
          email: input.email,
          password: input.password,
        }),
      });
    }),

  createAdmin: publicProcedure
    .input(adminSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.admin.create({
        data: adminSchema.parse(input),
      });
    }),

  updateAdmin: publicProcedure
    .input(adminSchema)
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.admin.update({
        where: {
          id: input.id,
        },
        data: adminSchema.parse(input),
      });
    }),

  deleteAdmin: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.admin.delete({
        where: idSchema.parse(input),
      });
    }),
});
