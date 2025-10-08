"use server";

import { deleteSaleSchema } from "@/data/delete-sale/schema";
import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.sale.delete({ where: { id } });
    revalidatePath("/sales");
  });
