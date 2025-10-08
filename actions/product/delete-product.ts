"use server";
import { deleteProductSchema } from "@/data/delete-product/schema";
import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const deleteProduct = actionClient
  .schema(deleteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({ where: { id } });
    revalidatePath("/products");
  });
