import "server-only";
import { db } from "@/lib/prisma";

export const getTotalProducts = async (): Promise<number> => {
  return await db.product.count();
};
