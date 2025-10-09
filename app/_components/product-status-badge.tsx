import { Badge } from "@/components/ui/badge";
import { ProductStatusDto } from "@/data/create-product/schema";
import { Circle } from "lucide-react";

interface ProductStatusBadgeProps {
  status: ProductStatusDto;
}

export const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = status === "IN_STOCK" ? "Em estoque" : "Sem estoque";
  return (
    <Badge variant={status === "IN_STOCK" ? "default" : "destructive"}>
      <Circle className="mr-1 fill-current" />
      {label}
    </Badge>
  );
};
