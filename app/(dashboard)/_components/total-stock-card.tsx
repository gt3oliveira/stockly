import { PackageIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalStock } from "@/data-access/dashboard/get-total-stock";

export const TotalStockCard = async () => {
  const totalStock = await getTotalStock();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
      <SummaryCardValue>{totalStock}</SummaryCardValue>
    </SummaryCard>
  );
};
