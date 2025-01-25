import React, { FC } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

type ISidebarProps = {};

const linkes = [
  {
    label: "Dashboard",
    link: "/",
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
  return (
    <aside className="border-r px-4 py-5">
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
