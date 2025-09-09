import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "name must be at least 2 characters").max(50),
  email: z.string().trim().email()
           .transform((s) => s.toLowerCase()),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[0-9]/, "Password must include a number"),
  phone: z.string().trim()
    .transform((s) => s.replace(/\D/g, ""))   // شيل أي رموز
    .refine((s) => s.length === 0 || /^\d{10,15}$/.test(s), "Phone must be 10–15 digits")
    .optional(),
});
export type RegisterValues = z.infer<typeof registerSchema>;
