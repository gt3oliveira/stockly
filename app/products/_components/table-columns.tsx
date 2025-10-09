"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionsDropdownMenu } from "./actions-dropdown-menu";
import { ProductDto } from "@/data/create-product/schema";
import { ProductStatusBadge } from "@/app/_components/product-status-badge";

export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
    cell: (row) => {
      const product = row.row.original;
      return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
      }).format(Number(product.price));
    },
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge status={product.status} />;
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
