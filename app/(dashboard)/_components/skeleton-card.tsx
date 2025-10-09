import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <div>
        <Skeleton className="mb-2 size-9" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-[14px] w-[100px]" />
        <Skeleton className="h-6 w-[200px]" />
      </div>
    </div>
  );
};
