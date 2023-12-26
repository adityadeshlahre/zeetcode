import { z } from "zod";

export const idSchema = z.object({ id: z.string() });
export const userTokenSchema = z.object({ email: z.string().email() });
export const adminTokenSchema = z.object({ email: z.string().email() });

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminSchema = z.object({
  username: z.string().min(1).max(10),
  name: z.string(),
  image: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  token: z.string(),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSchema = z.object({
  username: z.string().min(1).max(10),
  name: z.string(),
  image: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  token: z.string(),
});

export const challengeSchema = z.object({
  questionTitle: z.string(),
  questionDescription: z.string(),
  questionHint: z.string(),
  code: z.string(),
  solution: z.string(),
  adminId: z.string(),
});

export const submissionSchema = z.object({
  code: z.string(),
  language: z.string(),
  userId: z.string(),
  challengeId: z.string(),
});

export type TAdminSchema = z.infer<typeof adminSchema>;
export type TUserSchema = z.infer<typeof userSchema>;
export type TChallengeSchema = z.infer<typeof challengeSchema>;
export type TSubmissionSchema = z.infer<typeof submissionSchema>;
