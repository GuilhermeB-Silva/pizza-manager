import { validateCPF } from "@/utils/validations";
import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
export const registerProfessionalZodSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Informe o nome completo",
    }),
  email: z
    .string()
    .email("Email inválido")
    .transform((val) => val.toLowerCase()),
  profession: z.string().min(1, "Profissão é obrigatória"),
  cpf: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato xxx.xxx.xxx-xx"
    )
    .refine(validateCPF, {
      message: "CPF inválido",
    }),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Telefone inválido",
  }),
  password: z
    .string({ required_error: "Senha é obrigatório" })
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  zipcode: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export const registerZodSchema = registerProfessionalZodSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  }
);

export const registerProfessional = registerProfessionalZodSchema.omit({
  confirmPassword: true,
});

export type RegisterFormData = z.infer<typeof registerZodSchema>;
