import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[0-9]/, "Password must include a number"),
});

export type LoginValues = z.infer<typeof loginSchema>;
