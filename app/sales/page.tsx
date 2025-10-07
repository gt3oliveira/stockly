import React from "react";
import { getProducts } from "@/data-access/product/get-products";
import { ComboboxOption } from "@/components/ui/combobox";
import { CreateSaleButton } from "./_componets/create-sale-button";

export default async function SalesPage() {
  const products = await getProducts();
  const productOptions: ComboboxOption[] = products.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  return (
    <div className="m-6 w-full space-y-8 rounded-lg bg-white p-8">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de vendas
          </span>
          <h2 className="text-xl font-semibold">Vendas</h2>
        </div>
        <CreateSaleButton productOptions={productOptions} products={products} />
      </div>
      {/* <DataTable
        columns={productTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
}
