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

export const ActionsDropdownMenu = ({ productId }: { productId: string }) => {
  return (
    <AlertDialog>
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
            onClick={() => navigator.clipboard.writeText(productId)}
          >
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
      <DeleteDialogContent productId={productId} />
    </AlertDialog>
  );
};
