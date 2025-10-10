import { Skeleton } from "@/components/ui/skeleton";

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

export const SkeletonGraphic = () => {
  return (
    <Skeleton className="h-[257.97px] w-full rounded-xl bg-white p-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-[180px]" />
        <Skeleton className="h-5 w-[180px]" />
        <Skeleton className="h-36 w-full" />
      </div>
    </Skeleton>
  );
};

export const SkeletonSales = () => {
  return (
    <Skeleton className="h-[257.97px] w-full rounded-xl bg-white p-6">
      <div className="space-y-2">
        <Skeleton className="mb-4 h-7 w-[180px]" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </Skeleton>
  );
};
