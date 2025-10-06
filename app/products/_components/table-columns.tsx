"use client";

import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Circle } from "lucide-react";
import { ActionsDropdownMenu } from "./actions-dropdown-menu";

interface ProductTableProps extends Product {
  status: string;
}

export const productTableColumns: ColumnDef<ProductTableProps>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label =
        product.status === "IN_STOCK" ? "Em estoque" : "Sem estoque";
      return (
        <Badge
          variant={product.status === "IN_STOCK" ? "default" : "destructive"}
        >
          <Circle className="mr-1 fill-current" />
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const product = row.row.original;
      return (
        <ActionsDropdownMenu
          product={{ ...product, price: Number(product.price) }}
        />
      );
    },
  },
];
