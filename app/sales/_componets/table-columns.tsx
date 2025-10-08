"use client";

import { SalesDto } from "@/data/create-sale/schema";
import { formatCurrency } from "@/helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { SalesDropdownMenu } from "./table-dropdown-menu";
import { ProductDto } from "@/data/create-product/schema";
import { ComboboxOption } from "@/components/ui/combobox";

interface SaleTableColumn extends SalesDto {
  products: ProductDto[];
  productOptions: ComboboxOption[];
}

export const saleTableColumns: ColumnDef<SaleTableColumn>[] = [
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
    cell: ({ row: { original: sale } }) => (
      <SalesDropdownMenu
        sale={sale}
        productOptions={sale.productOptions}
        products={sale.products}
      />
    ),
  },
];
