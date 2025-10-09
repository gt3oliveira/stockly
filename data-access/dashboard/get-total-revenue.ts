import "server-only";
import { db } from "@/lib/prisma";

export const getTotalRevenue = async (): Promise<number> => {
  const totalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(`
    SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
    FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
`);

  return totalRevenue[0].totalRevenue;
};
