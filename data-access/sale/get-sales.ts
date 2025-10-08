import "server-only";
import { db } from "@/lib/prisma";
import { SaleProductDto, SalesDto } from "@/data/create-sale/schema";

export const getSales = async (): Promise<SalesDto[]> => {
  const sales = await db.sale.findMany({
    include: {
      products: {
        include: {
          product: true,
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
    saleProducts: sale.products.map(
      (saleProduct): SaleProductDto => ({
        productId: saleProduct.product.id,
        productName: saleProduct.product.name,
        quantity: saleProduct.quantity,
        unitPrice: Number(saleProduct.unitPrice),
      }),
    ),
  }));
};
