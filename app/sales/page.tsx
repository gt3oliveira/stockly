import React from "react";
import { getProducts } from "@/data-access/product/get-products";
import { ComboboxOption } from "@/components/ui/combobox";
import { CreateSaleButton } from "./_componets/create-sale-button";
import { saleTableColumns } from "./_componets/table-columns";
import { DataTable } from "@/components/ui/data-table";
import { getSales } from "@/data-access/sale/get-sales";
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "@/components/header";

export default async function SalesPage() {
  const products = await getProducts();
  const sales = await getSales();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));
  const tableData = sales.map((sale) => ({
    ...sale,
    products,
    productOptions,
  }));

  return (
    <div className="m-6 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de vendas</HeaderSubtitle>
          <HeaderTitle>Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateSaleButton
            productOptions={productOptions}
            products={products}
          />
        </HeaderRight>
      </Header>
      <DataTable columns={saleTableColumns} data={tableData} />
    </div>
  );
}
