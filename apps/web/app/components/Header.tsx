import { cn } from "@repo/ui/lib/utils";
import { FC, ReactNode } from "react";
import { Link } from "react-router";

type HeaderLocation = {
  label: ReactNode;
  link?: string;
};

type IHeaderProps = {
  location: HeaderLocation[];
  className?: string;
  rightSection?: ReactNode;
};

const Header: FC<IHeaderProps> = ({ location, className, rightSection }) => {
  return (
    <header
      className={cn("flex min-h-10 items-center justify-between", className)}
    >
      <div className="flex items-center gap-1">
        {location.map((l, i) => {
          const isLast = location.length - 1 === i;
          const label = l.label;

          return (
            <span
              className={"text-lg " + (isLast ? "font-medium" : "")}
              key={i}
            >
              {l.link ? (
                <Link to={l.link} viewTransition>
                  {label}
                </Link>
              ) : (
                label
              )}
              {isLast ? "" : <> | </>}
            </span>
          );
        })}
      </div>
      {rightSection && <div>{rightSection}</div>}
    </header>
  );
};

export default Header;
