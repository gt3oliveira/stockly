import "server-only";
import { db } from "@/lib/prisma";
import { ProductDto } from "@/data/create-product/schema";

export const getProducts = async (): Promise<ProductDto[]> => {
  const products = await db.product.findMany({});

  return products.map((product) => ({
    ...product,
    price: Number(product.price),
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};
