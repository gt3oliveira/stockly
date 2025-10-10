"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DayTotalRevenueDto } from "@/data/dashboard/schema";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
  totalRevenue: {
    label: "Receita",
  },
};

interface RevenueChartProps {
  data: DayTotalRevenueDto[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-0 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="totalRevenue" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
