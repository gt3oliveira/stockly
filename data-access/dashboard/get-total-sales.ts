import "server-only";
import { db } from "@/lib/prisma";

export const getTotalSales = async (): Promise<number> => {
  return db.sale.count();
};
