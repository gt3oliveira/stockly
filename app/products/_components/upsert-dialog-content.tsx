"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProductForm } from "@/data/create-product";
import { ProductsFormSchema } from "@/data/create-product/schema";
import { Loader2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";

interface UpsertProductDialogContentProps {
  defaultValues?: ProductsFormSchema;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const UpsertProductDialogContent = ({
  defaultValues,
  setIsOpen,
}: UpsertProductDialogContentProps) => {
  const { form, onSubmit } = useProductForm({
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Produto salvo com sucesso!");
    },
    onError: () => {
      setIsOpen(false);
      toast.error("Ocorreu um erro ao criar o produto.");
    },
    defaultValues,
  });

  const isEditing = !!defaultValues;

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Editar produto" : "Criar produto"}
            </DialogTitle>
            <DialogDescription>
              Insira as informações do produto no formulário abaixo.
            </DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <NumericFormat
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    placeholder="Preço do produto"
                    onValueChange={(value) => field.onChange(value.floatValue)}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade em estoque</FormLabel>
                <FormControl>
                  <NumericFormat
                    decimalScale={1}
                    allowNegative={false}
                    customInput={Input}
                    placeholder="Quantidade de produtos em estoque"
                    onValueChange={(value) => field.onChange(value.floatValue)}
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
