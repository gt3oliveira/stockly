import { ProductStatusBadge } from "@/app/_components/product-status-badge";
import { MostSoldProductsDto } from "@/data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/helpers/currency";

interface MostSoldProductProps {
  product: MostSoldProductsDto;
}
export const MostSoldProduct = ({ product }: MostSoldProductProps) => {
  return (
    <div>
      <ProductStatusBadge status={product.status} />
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="font-medium text-slate-500">
            {formatCurrency(product.price)}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">
            {product.totalSold} vendido(s)
          </p>
        </div>
      </div>
    </div>
  );
};
