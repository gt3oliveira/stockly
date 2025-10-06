"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { UpsertProductDialogContent } from "./upsert-dialog-content";

export const CreateProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Novo produto
        </Button>
      </DialogTrigger>
      <UpsertProductDialogContent setIsOpen={setDialogIsOpen} />
    </Dialog>
  );
};
