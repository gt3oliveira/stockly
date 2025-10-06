"use server";
import {
  deleteProductSchema,
  DeleteProductSchema,
} from "@/data/delete-product/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async ({ id }: DeleteProductSchema) => {
  deleteProductSchema.parse({ id });
  await db.product.delete({ where: { id } });
  revalidatePath("/products");
};
