import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const submissionSchema = z.object({
  code: z.string(),
  language: z.string(),
  userId: z.string(),
  challengeId: z.string(),
});

export const submissionRouter = createTRPCRouter({
  getAllSubmissions: publicProcedure.query(({ ctx }) => {
    return ctx.db.submission.findMany();
  }),

  getAllSubmissionsOfOneUser: publicProcedure
    .input(idSchema)
    .query(({ input, ctx }) => {
      return ctx.db.submission.findMany({
        where: { userId: input.id },
      });
    }),

  createNewCodeSubmission: publicProcedure
    .input(submissionSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.submission.create({
        data: submissionSchema.parse(input),
      });
    }),

  updateExistingCodeSubmission: publicProcedure
    .input(submissionSchema)
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.submission.update({
        where: { id: input.id },
        data: submissionSchema.parse(input),
      });
    }),

  deleteExistingCodeSubmission: publicProcedure
    .input(idSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.submission.delete({
        where: { id: input.id },
      });
    }),
});
