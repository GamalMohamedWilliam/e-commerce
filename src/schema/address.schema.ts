import { z } from "zod";

export const addressSchema = z.object({
  city: z.string(),
  details: z.string(),
  phone: z.string(),


});

export type addressSchemaForm = z.infer<typeof addressSchema>;
