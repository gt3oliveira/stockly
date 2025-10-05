"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productFormSchema, ProductsFormSchema } from "./schema";
import { createProduct } from "@/actions/product/create-product";

interface ProductFormProps {
  onSuccess: () => void;
  onError: () => void;
}

export function useProductForm({ onSuccess, onError }: ProductFormProps) {
  const form = useForm<ProductsFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
    shouldUnregister: true,
  });

  async function onSubmit(values: ProductsFormSchema) {
    try {
      await createProduct(values);
      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }
  }

  return {
    form,
    onSubmit,
  };
}
