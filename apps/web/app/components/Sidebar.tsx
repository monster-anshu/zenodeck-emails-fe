import { cn } from "@repo/ui/lib/utils";
import { FC, useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";

type ISidebarProps = {};

const linkes = [
  {
    label: "Dashboard",
    link: "/",
    exact: true,
  },
  {
    label: "Editor",
    link: "/editor",
  },
  {
    label: "Credential",
    link: "/credential",
  },
  {
    label: "Lead list",
    link: "/lead-list",
  },
  {
    label: "Campaign",
    link: "/campaign",
  },
  // {
  //   label: "Settings",
  //   link: "/settings",
  // },
];

const sidebarClosed = [/^\/campaign\//, /^\/editor/];

const Sidebar: FC<ISidebarProps> = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  // const selectedLink = linkes.find((link) =>
  //   link.exact
  //     ? location.pathname === link.link
  //     : location.pathname.startsWith(link.link)
  // );

  const isSidebarClosedDefault = sidebarClosed.find((regex) =>
    regex.test(location.pathname)
  );

  useEffect(() => {
    if (isSidebarClosedDefault) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isSidebarClosedDefault]);

  return (
    <aside
      className="relative border-r"
      style={{
        // display: selectedLink?.hideSidebar ? "none" : "block",
        width: isOpen ? "auto" : 0,
      }}
    >
      <button
        className={cn(
          "bg-background absolute bottom-12 right-0 z-10 rounded-full border shadow-2xl",
          isOpen ? "translate-x-1/2" : "translate-x-full"
        )}
        onClick={() => setIsOpen((curr) => !curr)}
      >
        {isOpen ? (
          <RiArrowLeftSLine size={20} />
        ) : (
          <RiArrowRightSLine size={20} />
        )}
      </button>
      <div
        className="w-52 px-2 py-5"
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <Logo className="mb-8" />
        <nav className="space-y-1">
          {linkes.map((link) => {
            return (
              <Link
                to={link.link}
                className="hover:bg-secondary text-foreground/80 hover:text-foreground/100 block rounded px-2 py-1.5"
                key={link.link}
                viewTransition
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
