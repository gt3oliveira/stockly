import { cn } from "@/lib/utils";

interface SummaryCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SummaryCardIcon = ({ children, className }: SummaryCardProps) => {
  return (
    <div
      className={cn(
        "mb-2 flex size-9 items-center justify-center rounded-md bg-slate-500/10 text-slate-500",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children, className }: SummaryCardProps) => {
  return (
    <p className={cn("text-sm font-medium text-slate-500", className)}>
      {children}
    </p>
  );
};

export const SummaryCardValue = ({ children, className }: SummaryCardProps) => {
  return (
    <p className={cn("text-2xl font-semibold text-slate-900", className)}>
      {children}
    </p>
  );
};

export const SummaryCard = ({ children, className }: SummaryCardProps) => {
  return (
    <div className={cn("rounded-xl bg-white p-6", className)}>{children}</div>
  );
};
