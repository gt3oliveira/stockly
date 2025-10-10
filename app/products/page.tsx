import { DataTable } from "@/components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { getProducts } from "@/data-access/product/get-products";
import { CreateProductButton } from "./_components/create-product-button";
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="m-6 w-full space-y-8 overflow-auto rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão de produtos</HeaderSubtitle>
          <HeaderTitle>Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateProductButton />
        </HeaderRight>
      </Header>
      <DataTable columns={productTableColumns} data={products} />
    </div>
  );
}
