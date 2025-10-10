import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SummaryCardIcon = ({ children, className }: SummaryCardProps) => {
  return (
    <div
      className={cn(
        "mb-2 flex size-9 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500",
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

export const SkeletonCard = () => {
  return (
    <Skeleton className="rounded-xl bg-white p-6">
      <div className="space-y-2">
        <Skeleton className="mb-2 size-9" />
        <Skeleton className="h-[14px] w-[100px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    </Skeleton>
  );
};
