import "server-only";
import { db } from "@/lib/prisma";

export interface SalesDto {
  id: string;
  productNames: string;
  totalQtdProducts: number;
  totalAmount: number;
  date: Date;
}

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return sales.map((sale) => ({
    id: sale.id,
    date: sale.date,
    productNames: sale.products
      .map((saleProduct) => saleProduct.product.name)
      .join(" ▫ "),
    totalQtdProducts: sale.products.reduce(
      (total, product) => total + product.quantity,
      0,
    ),
    totalAmount: sale.products.reduce(
      (total, product) => total + Number(product.unitPrice) * product.quantity,
      0,
    ),
  }));
};
