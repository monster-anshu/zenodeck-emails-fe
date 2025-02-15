import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.ComponentProps<"input"> & {
  hideIcon?: boolean;
  icon?: React.ComponentProps<"button"> & {
    position: "left" | "right";
  };
  containerClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      id,
      hideIcon,
      containerClassName,
      icon,
      maxLength,
      onChange,
      ...props
    },
    ref
  ) => {
    const [show, setShow] = React.useState(false);
    const randomId = React.useId();
    id = id || randomId;
    const showIcon = props.type === "password" && !hideIcon;
    let type = props.type;
    if (showIcon) {
      type = show ? "text" : "password";
    }

    return (
      <div className={cn("relative w-full", containerClassName)}>
        <input
          {...props}
          type={type}
          id={id}
          className={cn(
            "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            showIcon && "pr-8",
            icon?.position === "left" && "pl-8",
            icon?.position === "right" && "pr-8",
            className
          )}
          maxLength={maxLength}
          onChange={(ev) => {
            if (typeof maxLength === "number") {
              const value = ev.target.value.slice(0, maxLength);
              ev.target.value = value;
            }
            onChange?.(ev);
          }}
          ref={ref}
        />
        {showIcon && (
          <button
            type="button"
            onClick={() => setShow((curr) => !curr)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm"
          >
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
        {icon && (
          <button
            {...icon}
            className={cn(
              "absolute right-2 top-1/2 w-fit -translate-y-1/2",
              icon.position === "left" && "left-2",
              icon.position === "right" && "right-2",
              icon.className
            )}
          >
            {icon.children}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
