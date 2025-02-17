import { Skeleton } from "@repo/ui/components/skeleton";
import { FC } from "react";
import DashboardCard from "./DashboardCard";

type IDashboardSkeletonProps = {};

const DashboardSkeleton: FC<IDashboardSkeletonProps> = () => {
  return (
    <main
      className="container grid flex-1 grid-cols-5 gap-2 overflow-auto p-4"
      style={{
        gridAutoRows: "min-content",
      }}
    >
      <DashboardCard className="p-0">
        <Skeleton className="h-[75px]" variant="shine" />
      </DashboardCard>
      <DashboardCard className="p-0">
        <Skeleton className="h-[75px]" variant="shine" />
      </DashboardCard>
      <DashboardCard className="p-0">
        <Skeleton className="h-[75px]" variant="shine" />
      </DashboardCard>
      <DashboardCard className="p-0">
        <Skeleton className="h-[75px]" variant="shine" />
      </DashboardCard>
      <DashboardCard className="p-0">
        <Skeleton className="h-[75px]" variant="shine" />
      </DashboardCard>

      <DashboardCard className="col-span-full h-72 p-0">
        <Skeleton className="h-full" variant="shine" />
      </DashboardCard>
      <DashboardCard className="col-span-full h-72 p-0">
        <Skeleton className="h-full" variant="shine" />
      </DashboardCard>
      <DashboardCard className="col-span-full h-72 p-0">
        <Skeleton className="h-full" variant="shine" />
      </DashboardCard>
    </main>
  );
};

export default DashboardSkeleton;
