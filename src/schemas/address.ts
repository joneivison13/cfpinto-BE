import { z } from "zod";

const addressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    main: z.boolean(),
    number: z.string(),
    neighborhood: z.string(),
    postal_code: z.string(),
    country: z.string(),
  })
  .strict();

export default addressSchema;

export type AddressSchema = z.infer<typeof addressSchema>;
