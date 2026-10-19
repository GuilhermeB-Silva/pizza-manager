import { validateCPF } from "@/utils/validations";
import { z } from "zod";

export const fullPaymentSchema = z.object({
  cvv: z
    .string()
    .min(3, "O CVV deve ter no mínimo 3 dígitos")
    .max(4, "O CVV deve ter no máximo 4 dígitos")
    .regex(/^\d+$/, "O CVV deve conter apenas números"),
  cardNumber: z
    .string()
    .min(13, "Cartão inválido")
    .max(19, "O número do cartão é muito longo"),
  expire: z.string().min(5, "Data de validade inválida"),
  holderDocument: z
    .string()
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "CPF deve estar no formato xxx.xxx.xxx-xx"
    )
    .refine(validateCPF, {
      message: "CPF inválido",
    }),
  holderName: z
    .string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Informe o nome como consta no cartão",
    }),
  addressLine1: z.string().min(1, "Endereço é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  addressLine2: z.string().optional(),
  zipCode: z.string().min(1, "CEP é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  country: z.string().min(1, "País é obrigatório"),
});
