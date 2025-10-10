import "server-only";
import { db } from "@/lib/prisma";
import dayjs from "dayjs";
import { ProductStatusDto } from "@/data/create-product/schema";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}

interface DashboardDto {
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductsDto[];
}

export const getDashboard = async (): Promise<DashboardDto> => {
  const today = dayjs().endOf("day").toDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => {
      return dayjs(today).subtract(day, "day");
    },
  );
  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const dayTotalRevenue = await db.$queryRawUnsafe<
      { totalRevenue: number }[]
    >(
      `
      SELECT SUM("unitPrice" * "quantity") as "totalRevenue"
      FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= $1 AND "Sale"."date" <= $2
    `,
      day.startOf("day").toDate(),
      day.endOf("day").toDate(),
    );

    totalLast14DaysRevenue.push({
      day: day.format("DD/MM"),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue),
    });
  }

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
    totalLast14DaysRevenue,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      ...product,
      status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
    })),
  });
};
