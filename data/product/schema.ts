import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(2, {
    message: "O nome é obrigatório.",
  }),
  price: z.number().min(0.01, {
    message: "O preco é obrigatório.",
  }),
  stock: z.number().min(1, {
    message: "A quantidade em estoque é obrigatória.",
  }),
});
