import React, { FC } from "react";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";

type ISidebarProps = {};

export const linkes = [
  {
    label: "Dashboard",
    link: "/",
    exact: true,
  },
  {
    label: "Editor",
    link: "/editor",
    hideSidebar: true,
  },
  {
    label: "Credentials",
    link: "/credential",
  },
  {
    label: "Settings",
    link: "/settings",
  },
];

const Sidebar: FC<ISidebarProps> = () => {
  const location = useLocation();

  const selectedLink = linkes.find((link) =>
    link.exact
      ? location.pathname === link.link
      : location.pathname.startsWith(link.link)
  );

  return (
    <aside
      className="w-60 border-r px-4 py-5"
      style={{
        display: selectedLink?.hideSidebar ? "none" : "block",
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
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
