import { validateCPF, validatetDate } from "@/utils/validations";
import { z } from "zod";

export const candidateZodSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Informe o nome completo",
    }),

  email: z.string().email("Email inválido"),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato xxx.xxx.xxx-xx"
    )
    .refine(validateCPF, {
      message: "CPF inválido",
    }),
  birthdate: z
    .string()
    .regex(
      /^\d{2}\/\d{2}\/\d{4}$/,
      "Data de nascimento deve estar no formato xx/xx/xxxx"
    )
    .refine((data) => validatetDate(data), { message: "Data inválida" }),
  age: z.string().min(1, "Idade é obrigatório"),
  phone: z
    .string()
    .regex(
      /^(\(\d{2}\) \d{5}-\d{4}|\(\d{2}\) \d{4}-\d{4})$/,
      "Telefone deve estar no formato (xx) xxxxx-xxxx ou (xx) xxxx-xxxx"
    ),
  gender: z.string().min(1, "Sexo é obrigatório"),
  uf: z.string().min(1, "UF é obrigatório"),
  education: z.string().min(1, "Escolaridade é obrigatório"),
  education_type: z.string().min(1, "Instituição é obrigatório"),
});

export type CandidateFormData = z.infer<typeof candidateZodSchema>;
