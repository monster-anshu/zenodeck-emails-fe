import React, { FC } from "react";
import styles from "./skeleton.module.css";

import { cn } from "@repo/ui/lib/utils";

export interface ISkeletonProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "shine" | "blink";
}

const Skeleton: FC<ISkeletonProps> = ({
  className,
  variant = "blink",
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "h-10 rounded-lg",
        className,
        variant === "shine" && styles.skeletonShine,
        variant === "blink" && styles.skeletonBlink
      )}
    ></div>
  );
};

export { Skeleton };
