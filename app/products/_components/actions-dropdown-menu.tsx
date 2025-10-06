"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { DeleteDialogContent } from "@/components/delete-dialog-content";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UpsertProductDialogContent } from "./upsert-dialog-content";
import { useState } from "react";
import { ProductsFormSchema } from "@/data/create-product/schema";

interface ActionsDropdownMenuProps {
  product: ProductsFormSchema;
}

export const ActionsDropdownMenu = ({ product }: ActionsDropdownMenuProps) => {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

  return (
    <AlertDialog>
      <Dialog open={editDialogIsOpen} onOpenChange={setEditDialogIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(product.id as string)
              }
            >
              <ClipboardCopyIcon />
              Copiar ID
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <EditIcon />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger className="w-full">
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Deletar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpsertProductDialogContent
          setIsOpen={setEditDialogIsOpen}
          defaultValues={product}
        />
        <DeleteDialogContent productId={product.id as string} />
      </Dialog>
    </AlertDialog>
  );
};
