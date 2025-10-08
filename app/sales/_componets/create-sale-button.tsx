"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UpsertSheetContent } from "./upsert-sheet-content";
import { ComboboxOption } from "@/components/ui/combobox";
import { useState } from "react";
import { ProductDto } from "@/data/create-product/schema";

interface CreateSaleButtonProps {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const CreateSaleButton = (props: CreateSaleButtonProps) => {
  const [openSheet, setOpenSheet] = useState(false);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetTrigger asChild>
        <Button>Nova Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent {...props} setOpenSheet={setOpenSheet} />
    </Sheet>
  );
};
