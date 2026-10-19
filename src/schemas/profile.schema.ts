import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Create separate schema for the password form
export const passwordZodSchema = z
  .object({
    password: z.string().min(1, "Senha é obrigatória"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const profileZodSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Informe o nome completo",
    }),
  email: z.string().email("Email inválido"),
  profession: z.string().min(1, "Profissão é obrigatória"),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Telefone inválido",
  }),
  zipcode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export const profileAdminZodSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Informe o nome completo",
    }),
  email: z.string().email("Email inválido"),
});

export type ProfileFormData = z.infer<typeof profileZodSchema>;
export type PasswordFormData = z.infer<typeof passwordZodSchema>;
