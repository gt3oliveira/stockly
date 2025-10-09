import { Product } from "@prisma/client";
import { z } from "zod";

export const productFormSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2, {
    message: "O nome é obrigatório.",
  }),
  price: z.number().min(0.01, {
    message: "O preco é obrigatório.",
  }),
  stock: z.number().min(0, {
    message: "A quantidade em estoque é obrigatória.",
  }),
});

export type ProductsFormSchema = z.infer<typeof productFormSchema>;

type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK";
export interface ProductDto extends Omit<Product, "price"> {
  price: number;
  status: ProductStatusDto;
}
