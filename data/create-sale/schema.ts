import z from "zod/v3";

export const createSaleSchema = z.object({
  id: z.string().uuid().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.coerce.number().int().positive().min(1),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;

export interface SaleProductDto {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface SalesDto {
  id: string;
  productNames: string;
  totalQtdProducts: number;
  totalAmount: number;
  date: Date;
  saleProducts: SaleProductDto[];
}
