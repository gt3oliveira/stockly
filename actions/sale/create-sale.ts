"use server";

import { createSaleSchema } from "@/data/create-sale/schema";
import { db } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .schema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (trx) => {
      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: {
            id: product.id,
          },
        });

        if (!productFromDb) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["O produto não existe."],
          });
        }

        const productOutOfStock = product.quantity > productFromDb.stock;
        if (productOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Quantidade insuficiente em estoque."],
          });
        }

        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            unitPrice: productFromDb.price,
            quantity: product.quantity,
          },
        });

        await trx.product.update({
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
    });

    revalidatePath("/sales");
    revalidatePath("/products");
  });
