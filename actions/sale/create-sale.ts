"use server";

import { createSaleSchema, CreateSaleSchema } from "@/data/create-sale/schema";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });

  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });

    if (!productFromDb) {
      throw new Error("Produto não encontrado");
    }

    const productOutOfStock = product.quantity > productFromDb.stock;
    if (productOutOfStock) {
      throw new Error("Quantidade de produtos insuficiente");
    }

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        unitPrice: productFromDb.price,
        quantity: product.quantity,
      },
    });

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        stock: {
          decrement: product.quantity,
        },
      },
    });
  }

  revalidatePath("/sales");
  revalidatePath("/products");
};
