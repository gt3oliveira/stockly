"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UpsertSheetContent } from "./upsert-sheet-content";
import { ComboboxOption } from "@/components/ui/combobox";
import { Product } from "@prisma/client";
import { useState } from "react";

interface CreateSaleButtonProps {
  products: Product[];
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
