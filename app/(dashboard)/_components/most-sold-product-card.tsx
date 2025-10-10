import { getMostSoldProducts } from "@/data-access/dashboard/get-most-sold-products";
import { MostSoldProduct } from "./most-sold-product-item";

export const MostSoldProductCard = async () => {
  const mostSoldProducts = await getMostSoldProducts();

  return (
    <div className="flex h-full flex-col space-y-4 overflow-hidden rounded-xl bg-white p-6">
      <p className="text-lg font-semibold text-slate-900">
        Produtos mais vendidos
      </p>
      <div className="space-y-7 overflow-y-auto pr-3">
        {mostSoldProducts.map((product) => (
          <MostSoldProduct product={product} key={product.productId} />
        ))}
      </div>
    </div>
  );
};
