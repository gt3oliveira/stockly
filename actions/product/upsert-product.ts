"use server";
import {
  productFormSchema,
  ProductsFormSchema,
} from "@/data/create-product/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const upsertProduct = async (data: ProductsFormSchema) => {
  productFormSchema.parse(data);
  await db.product.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: data,
  });
  revalidatePath("/products");
};
