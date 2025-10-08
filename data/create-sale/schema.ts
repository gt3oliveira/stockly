import z from "zod/v3";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.coerce.number().int().positive().min(1),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;

export interface SalesDto {
  id: string;
  productNames: string;
  totalQtdProducts: number;
  totalAmount: number;
  date: Date;
}
