import React, { ReactNode } from "react";
import { Link } from "gatsby";

export const NavLink = ({ children, to, className }: NavLinkProps) => {
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

export const HomeNavLink = ({ children, to, className }: NavLinkProps) => {
  return (
    <Link to={to} className={className} activeClassName={`active-nav-item`}>
      {children}
    </Link>
  );
};
interface NavLinkProps {
  children: ReactNode;
  to: string;
  className: string;
}
