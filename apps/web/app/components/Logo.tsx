import { cn } from "@repo/ui/lib/utils";
import React, { FC } from "react";

type ILogoProps = {
  className?: string;
};

const Logo: FC<ILogoProps> = ({ className }) => {
  return (
    <div className={cn("px-2 text-base font-bold", className)}>
      Zenodeck Campaign
    </div>
  );
};

export default Logo;
