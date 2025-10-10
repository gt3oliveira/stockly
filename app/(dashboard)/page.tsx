import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import { RevenueChart } from "./_components/revenue-chart";
import { MostSoldProduct } from "./_components/most-sold-product-item";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { Suspense } from "react";
import { SkeletonCard } from "./_components/summary-card";
import { TodayRevenueCard } from "./_components/today-revenue-card";
import { TotalSalesCard } from "./_components/total-sales-card";
import { TotalStockCard } from "./_components/total-stock-card";
import { TotalProductsCard } from "./_components/total-products-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Last14DaysRevenue } from "@/data-access/dashboard/get-last-14-days-revenue";
import { getMostSoldProducts } from "@/data-access/dashboard/get-most-sold-products";

export default async function Home() {
  const mostSoldProducts = await getMostSoldProducts();
  const totalLast14DaysRevenue = await Last14DaysRevenue();

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
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <Suspense
            fallback={<Skeleton className="h-full w-full rounded-xl" />}
          >
            <RevenueChart data={totalLast14DaysRevenue} />
          </Suspense>
        </div>
        <div className="flex h-full flex-col space-y-4 overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">
            Produtos mais vendidos
          </p>
          <div className="space-y-7 overflow-y-auto pr-3">
            <Suspense
              fallback={<Skeleton className="h-40 w-full rounded-xl" />}
            >
              {mostSoldProducts.map((product) => (
                <MostSoldProduct product={product} key={product.productId} />
              ))}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
