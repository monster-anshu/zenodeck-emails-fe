import React, { FC } from "react";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

export type ISpinnerProps = React.ComponentProps<typeof CgSpinner>;

const Spinner: FC<ISpinnerProps> = ({ className, ...props }) => (
  <CgSpinner
    {...props}
    className={twMerge("text-p1 mx-auto animate-spin text-2xl", className)}
  />
);

export default Spinner;
