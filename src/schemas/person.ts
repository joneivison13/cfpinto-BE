import { z } from "zod";

const personSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, "Preencha o campo"),
    nacionality: z.string().min(1, "Preencha o campo"),
    document: z.string().min(1, "Preencha o campo"),
    birthDate: z.date().or(z.string().min(1, "Preencha o campo")),
    gender: z.enum(["M", "F"], {
      required_error: "Preencha o campo",
    }),
    phone: z.string().min(1, "Preencha o campo"),
    telephone: z.string().min(1, "Preencha o campo"),
    email: z.string().email("Email inválido"),
    civil_state: z.string().min(1, "Preencha o campo"),
    father_name: z.string().min(1, "Preencha o campo"),
    mother_name: z.string().min(1, "Preencha o campo"),
    profession: z.string().min(1, "Preencha o campo"),
    is_client: z.boolean(),
    natural_city: z.string().min(1, "Preencha o campo"),
    natural_country: z.string().min(1, "Preencha o campo"),
    natural_state: z.string().min(1, "Preencha o campo"),
  })
  .strict();

export default personSchema;

export type PersonSchema = z.infer<typeof personSchema>;
