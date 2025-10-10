import "server-only";
import { MostSoldProductsDto } from "@/data/dashboard/schema";
import { db } from "@/lib/prisma";

export const getMostSoldProducts = async (): Promise<MostSoldProductsDto[]> => {
  const mostSoldProducts = await db.$queryRawUnsafe<
    {
      productId: string;
      name: string;
      totalSold: number;
      stock: number;
      price: number;
    }[]
  >(`
      SELECT "Product"."name", SUM("SaleProduct"."quantity") as "totalSold",
      "Product"."price", "Product"."stock", "Product"."id" as "productId"
      FROM "SaleProduct"
      JOIN "Product" ON "Product"."id" = "SaleProduct"."productId"
      GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
      ORDER BY "totalSold" DESC
      LIMIT 5
  `);

  return mostSoldProducts.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
