"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productFormSchema, ProductsFormSchema } from "./schema";
import { upsertProduct } from "@/actions/product/upsert-product";

interface ProductFormProps {
  defaultValues?: ProductsFormSchema;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useProductForm({
  onSuccess,
  onError,
  defaultValues,
}: ProductFormProps) {
  const form = useForm<ProductsFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
    shouldUnregister: true,
  });

  async function onSubmit(data: ProductsFormSchema) {
    try {
      await upsertProduct({ ...data, id: defaultValues?.id });
      onSuccess?.();
    } catch (error) {
      console.log(error);
      onError?.();
    }
  }

  return {
    form,
    onSubmit,
  };
}
