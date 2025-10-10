import { Last14DaysRevenue } from "@/data-access/dashboard/get-last-14-days-revenue";
import { RevenueChart } from "./revenue-chart";

export const Last14DaysRevenueCard = async () => {
  const totalLast14DaysRevenue = await Last14DaysRevenue();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className="text-lg font-semibold text-slate-900">Receita</p>
      <p className="text-sm text-slate-400">Últimos 14 dias</p>
      <RevenueChart data={totalLast14DaysRevenue} />
    </div>
  );
};
