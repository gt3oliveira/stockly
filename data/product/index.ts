"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productFormSchema } from "./schema";

type FormSchema = z.infer<typeof productFormSchema>;

export function useProductForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 1,
    },
    shouldUnregister: true,
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return {
    form,
    onSubmit,
  };
}
