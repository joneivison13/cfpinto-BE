import { z } from "zod";

const documentSchema = z
  .object({
    type: z.any().optional(),
    value: z.string(),
    file_dir: z.string().optional(),
    file: z.string().optional(),
    expedit: z.date().optional(),
    expDate: z.date().optional(),
    expCorp: z.string().optional(),
    typeId: z.string().optional(),
  })
  .strict();

export default documentSchema;

export type DocumentSchema = z.infer<typeof documentSchema>;
