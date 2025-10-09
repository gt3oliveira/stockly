"use server";
import { productFormSchema } from "@/data/create-product/schema";
import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const upsertProduct = actionClient
  .schema(productFormSchema)
  .action(async ({ parsedInput: { id, ...data } }) => {
    await db.product.upsert({
      where: { id: id ?? "" },
      update: data,
      create: data,
    });
    revalidatePath("/products", "page");
    revalidatePath("/");
  });
