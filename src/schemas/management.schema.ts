import { z } from "zod";

export const managementSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Informe o nome completo",
    }),
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
});

export const managementZodSchema = managementSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  }
);

export const managementEditZodSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});
