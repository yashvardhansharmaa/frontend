import React, { ReactNode } from "react";
import { Link } from "gatsby";

const NavLink = ({ children, to, className }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={className}
      activeClassName={`active-nav-item`}
      partiallyActive={true}
    >
      {children}
    </Link>
  );
};

interface NavLinkProps {
  children: ReactNode;
  to: string;
  className: string;
}

export default NavLink;
