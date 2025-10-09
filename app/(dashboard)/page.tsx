import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "@/app/_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import {
  CircleDollarSign,
  DollarSignIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import { getDashboard } from "@/data-access/dashboard/get-dashboard";
import { formatCurrency } from "@/helpers/currency";
import { RevenueChart } from "./_components/revenue-chart";
import { MostSoldProduct } from "./_components/most-sold-product-item";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { Suspense } from "react";
import { SkeletonCard } from "./_components/skeleton-card";

export default async function Home() {
  const {
    todayRevenue,
    totalProducts,
    totalSales,
    totalStock,
    totalLast14DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();

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

        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Hoje</SummaryCardTitle>
          <SummaryCardValue>{formatCurrency(todayRevenue)}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Últimos 14 dias</p>
          <RevenueChart data={totalLast14DaysRevenue} />
        </div>
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
      </div>
    </div>
  );
}
