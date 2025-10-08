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
import { Sale } from "@prisma/client";
import { toast } from "sonner";

interface SalesActionsDropDownMenuProps {
  sale: Pick<Sale, "id">;
}

export const SalesDropdownMenu = ({ sale }: SalesActionsDropDownMenuProps) => {
  const handleCopyToClipboardClick = () => {
    navigator.clipboard.writeText(sale.id);
    toast.success("ID copiado para a área de transferência!");
  };

  return (
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
          <DropdownMenuItem>
            <EditIcon />
            Editar
          </DropdownMenuItem>
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
  );
};
