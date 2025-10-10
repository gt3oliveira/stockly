import { ProductStatusDto } from "../create-product/schema";

export interface DayTotalRevenueDto {
  day: string;
  totalRevenue: number;
}

export interface MostSoldProductsDto {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDto;
  price: number;
}
