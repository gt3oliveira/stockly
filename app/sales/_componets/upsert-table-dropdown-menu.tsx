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
import {
  ClipboardCopyIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";

interface SalesActionsDropDownMenuProps {
  productId: string;
  onDelete: (productId: string) => void;
}

export const UpsertSaleActionsDropDownMenu = ({
  productId,
  onDelete,
}: SalesActionsDropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(productId)}
        >
          <ClipboardCopyIcon />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(productId)}
        >
          <Trash2Icon />
          Remover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
