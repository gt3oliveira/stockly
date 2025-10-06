"use server";
import {
  productFormSchema,
  ProductsFormSchema,
} from "@/data/create-product/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (data: ProductsFormSchema) => {
  productFormSchema.parse(data);
  await db.product.create({ data });
  revalidatePath("/products");
};
