import { validateCPF } from "@/utils/validations";
import { z } from "zod";
import { registerProfessionalZodSchema } from "./register.schema";

export const editProfessionalZodSchema = registerProfessionalZodSchema
  .omit({
    name: true,
    email: true,
    profession: true,
    cpf: true,
    phone: true,
    city: true,
    complement: true,
    neighborhood: true,
    number: true,
    state: true,
    street: true,
    zipcode: true,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  });

export const professionalZodSchema = registerProfessionalZodSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  }
);

export type ProfessionalFormData = z.infer<typeof professionalZodSchema>;

export type EditProfessionalFormData = z.infer<
  typeof editProfessionalZodSchema
>;
