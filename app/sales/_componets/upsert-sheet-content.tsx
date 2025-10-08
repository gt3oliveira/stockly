"use client";

import { Button } from "@/components/ui/button";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { UpsertSaleActionsDropDownMenu } from "./upsert-table-dropdown-menu";
import { createSale } from "@/actions/sale/create-sale";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { flattenValidationErrors } from "next-safe-action";
import { ProductDto } from "@/data/create-product/schema";

const formSchema = z.object({
  productId: z.string().uuid({ message: "Selecione um produto." }),
  quantity: z.coerce
    .number()
    .int()
    .positive({ message: "Quantidade é obrigatória." })
    .min(1),
});

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const UpsertSheetContent = ({
  productOptions,
  products,
  setOpenSheet,
}: UpsertSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct[]>([]);

  const { execute: executeCreateSale } = useAction(createSale, {
    onError: ({ error: { validationErrors } }) => {
      const flattenedErrors = flattenValidationErrors(validationErrors);
      toast.error(flattenedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success("Venda realizada com sucesso.");
      setSelectedProduct([]);
      setOpenSheet(false);
    },
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
    shouldUnregister: true,
  });

  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find((item) => item.id === data.productId);
    if (!selectedProduct) return;

    setSelectedProduct((prev) => {
      const productExists = prev.find((item) => item.id === selectedProduct.id);

      if (productExists) {
        const productOutInStock =
          productExists.quantity + data.quantity > selectedProduct.stock;
        if (productOutInStock) {
          form.setError("quantity", {
            message: "Quantidade indisponível em estoque.",
          });
          return prev;
        }

        form.reset();
        return prev.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + data.quantity }
            : product,
        );
      }

      const productOutInStock = data.quantity > selectedProduct.stock;
      if (productOutInStock) {
        form.setError("quantity", {
          message: "Quantidade indisponível em estoque.",
        });
        return prev;
      }

      form.reset();
      return [
        ...prev,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProduct.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  }, [selectedProduct]);

  const onDelete = (productId: string) => {
    setSelectedProduct((prev) => prev.filter((item) => item.id !== productId));
  };

  const onSubmitSale = async () => {
    executeCreateSale({ products: selectedProduct });
  };

  return (
    <SheetContent className="!max-w-[520px] px-4">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informações abaixo.</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Selecione um produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" variant={"secondary"}>
            <PlusIcon />
            Adicionar produto a venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.quantity * product.price)}
              </TableCell>
              <TableCell>
                <UpsertSaleActionsDropDownMenu
                  onDelete={onDelete}
                  productId={product.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="px-0">
        <Button
          disabled={selectedProduct.length === 0 || form.formState.isSubmitting}
          onClick={onSubmitSale}
        >
          <CheckIcon />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};
