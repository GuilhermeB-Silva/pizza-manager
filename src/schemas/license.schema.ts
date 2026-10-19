import { z } from "zod";

export const licenseObjSchema = z.object({
  price: z
    .number()
    .min(1, "Preço é obrigatório")
    .transform((val) => Number(val)),
  min_quantity: z
    .number()
    .min(1, "Quantidade mínima é obrigatória")
    .transform((val) => Number(val)),
  id: z.string(),
  label: z.string(),
});

export const licenseZodSchema = z.object({
  prices: z.array(licenseObjSchema),
});
