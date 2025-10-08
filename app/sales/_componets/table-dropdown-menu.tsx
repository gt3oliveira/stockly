"use client";

import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontalIcon,
  ClipboardCopyIcon,
  EditIcon,
  Trash2Icon,
} from "lucide-react";
import { SaleDeleteDialogContent } from "./delete-dialog-content";
import { toast } from "sonner";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UpsertSheetContent } from "./upsert-sheet-content";
import { useState } from "react";
import { ComboboxOption } from "@/components/ui/combobox";
import { ProductDto } from "@/data/create-product/schema";
import { SalesDto } from "@/data/create-sale/schema";

interface SalesActionsDropDownMenuProps {
  sale: Pick<SalesDto, "id" | "saleProducts">;
  productOptions: ComboboxOption[];
  products: ProductDto[];
}

export const SalesDropdownMenu = ({
  sale,
  productOptions,
  products,
}: SalesActionsDropDownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);
  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência!");
  };

  return (
    <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center">Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyToClipboardClick}>
              <ClipboardCopyIcon />
              Copiar ID
            </DropdownMenuItem>
            <SheetTrigger asChild>
              <DropdownMenuItem>
                <EditIcon />
                Editar
              </DropdownMenuItem>
            </SheetTrigger>
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <SaleDeleteDialogContent saleId={sale.id} />
      </AlertDialog>

      <UpsertSheetContent
        saleId={sale.id}
        productOptions={productOptions}
        products={products}
        setOpenSheet={setUpsertSheetIsOpen}
        defaultSelectProducts={sale.saleProducts.map((saleProduct) => ({
          id: saleProduct.productId,
          quantity: saleProduct.quantity,
          price: saleProduct.unitPrice,
          name: saleProduct.productName,
        }))}
      />
    </Sheet>
  );
};
