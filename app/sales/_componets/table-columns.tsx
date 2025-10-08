"use client";

import { SalesDto } from "@/data/create-sale/schema";
import { formatCurrency } from "@/helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { SalesDropdownMenu } from "./table-dropdown-menu";

export const saleTableColumns: ColumnDef<SalesDto>[] = [
  {
    accessorKey: "productNames",
    header: "Produtos",
  },
  {
    accessorKey: "totalQtdProducts",
    header: "Quantidade",
  },
  {
    accessorKey: "totalAmount",
    header: "Valor Total",
    cell: ({
      row: {
        original: { totalAmount },
      },
    }) => formatCurrency(totalAmount),
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => new Date(date).toLocaleDateString("pt-BR"),
  },
  {
    header: "Ações",
    cell: ({ row: { original: sale } }) => <SalesDropdownMenu sale={sale} />,
  },
];
