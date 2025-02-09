import React, { FC } from "react";
import styles from "./skeleton.module.css";

import { cn } from "@repo/ui/lib/utils";

export interface ISkeletonProps extends React.ComponentPropsWithoutRef<"div"> {}

const Skeleton: FC<ISkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn("h-10 rounded", className, styles.skeletonContainer)}
    ></div>
  );
};

export { Skeleton };
