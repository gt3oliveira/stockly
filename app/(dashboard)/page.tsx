import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { Suspense } from "react";
import { TodayRevenueCard } from "./_components/today-revenue-card";
import { TotalSalesCard } from "./_components/total-sales-card";
import { TotalStockCard } from "./_components/total-stock-card";
import { TotalProductsCard } from "./_components/total-products-card";
import { Last14DaysRevenueCard } from "./_components/last-14-days-revenue-card";
import { MostSoldProductCard } from "./_components/most-sold-product-card";
import {
  SkeletonGraphic,
  SkeletonSales,
  SkeletonCard,
} from "./_components/dashboard-skeleton";

export default async function Home() {
  return (
    <div className="m-6 flex w-full flex-col space-y-6 rounded-lg">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Gestão do estoque</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>

      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SkeletonCard />}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SkeletonCard />}>
          <TotalSalesCard />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <TotalStockCard />
        </Suspense>

        <Suspense fallback={<SkeletonCard />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6">
        <Suspense fallback={<SkeletonGraphic />}>
          <Last14DaysRevenueCard />
        </Suspense>
        <Suspense fallback={<SkeletonSales />}>
          <MostSoldProductCard />
        </Suspense>
      </div>
    </div>
  );
}
