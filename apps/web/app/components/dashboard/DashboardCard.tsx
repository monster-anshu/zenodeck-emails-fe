import { cn } from "@repo/ui/lib/utils";
import React, { FC, ReactNode } from "react";

type IDashboardCardProps = {
  className?: string;
  children?: ReactNode;
};

const DashboardCard: FC<IDashboardCardProps> = ({ className, children }) => {
  return (
    <div className={cn("bg-secondary rounded border p-4 shadow", className)}>
      {children}
    </div>
  );
};

export default DashboardCard;
