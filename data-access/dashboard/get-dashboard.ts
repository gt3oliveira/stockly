import "server-only";
import { db } from "@/lib/prisma";
import { ProductStatusDto } from "@/data/create-product/schema";

export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

interface DashboardDto {
  mostSoldProducts: MostSoldProductsDto[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const mostSoldProductsPromise = db.$queryRawUnsafe<
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

  const [mostSoldProducts] = await Promise.all([mostSoldProductsPromise]);

  return Promise.resolve({
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  });
};
