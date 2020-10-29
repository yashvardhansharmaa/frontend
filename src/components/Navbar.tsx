import React, { FC, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import DarkLightSwitch from "./DarkLightSwitch";
import { menuItems, item, subItem } from "../assets/menuItems";
import logo from "../assets/logo.png";
import Hamburger from "hamburger-react";
import "../assets/styles/navbar.scss";
import NavLink from "./NavLink";

const Logo = styled.img`
  height: 50px;
  width: 50px;
`;

/*
.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.topnav a:hover, .dropdown:hover .dropbtn {
  background-color: #555;
  color: white;
}

.dropdown-content a:hover {
  background-color: #ddd;
  color: black;
}

.dropdown:hover .dropdown-content {
  display: block;
}
*/

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const NavItemWithDropdown = ({ menuItem, i }: NavItemProps) => {
    return (
      <div
        className={!isOpen ? `dropdown mr-5` : `dropdown mr-5 mb-5 text-xl`}
        key={i}
      >
        <NavLink to={menuItem.link} className="dropbtn focus:outline-none">
          {menuItem.name}
        </NavLink>
        <div
          className="dropdown-content hidden z-10 absolute"
          style={{ minWidth: "160px" }}
        >
          {menuItem.subItems?.map((subMenuItem: subItem, i2) => {
            return (
              <NavLink
                to={subMenuItem.href}
                className="block px-4 py-2"
                key={i2}
              >
                {subMenuItem.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    );
  };

  const NavItem = ({ menuItem, i }: NavItemProps) => {
    return (
      <NavLink
        to={menuItem.link}
        key={i}
        className={!isOpen ? `mr-5` : `mb-5 mr-5 text-xl`}
      >
        {menuItem.name}
      </NavLink>
    );
  };

  const RenderNavItems = ({ menuItems }: NavProps) => {
    return (
      <>
        {menuItems.map((menuItem: item, i: number) => {
          return (
            <>
              {menuItem.subItems ? (
                <NavItemWithDropdown menuItem={menuItem} i={i} />
              ) : (
                <NavItem menuItem={menuItem} i={i} />
              )}
            </>
          );
        })}
      </>
    );
  };

  const Nav = ({ menuItems }: NavProps) => {
    return (
      <nav className="md:ml-auto md:flex hidden items-center text-base justify-center">
        <RenderNavItems menuItems={menuItems} />
        <DarkLightSwitch />
      </nav>
    );
  };

  const FullHeightNav = ({ menuItems }: NavProps) => {
    // md:ml-auto md:flex hidden items-center text-base justify-center
    return (
      <nav
        className="md:ml-auto absolute flex flex-col items-center text-base justify-center"
        style={{
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
        }}
      >
        <RenderNavItems menuItems={menuItems} />
        <DarkLightSwitch />
      </nav>
    );
  };

  const BrandLogo = () => (
    <a href="/">
      <Logo src={logo} alt="" className="mx-3 " />
      <div className="md:flex hidden justify-center mx-3">
        <span className="bg-primary h-100" style={{ width: "2px" }}></span>
      </div>
    </a>
  );

  const BrandTitle = () => (
    <a href="/">
      <div className="mx-3 flex text-lg justify-center items-center">
        The Tidings Blog
      </div>
    </a>
  );

  return (
    <header
      className={
        !isOpen
          ? `text-main bg-bgc body-font h-10vh md:fixed md:top-0 md:left-0 w-full`
          : `text-main bg-bgc body-font h-screen md:fixed md:top-0 md:left-0 w-full`
      }
      style={{
        transition: "all 0.5s ease",
      }}
    >
      <div className="container relative justify-between md:justify-start mx-auto flex p-5 flex-row items-center">
        <BrandLogo />
        <BrandTitle />
        {!isOpen ? (
          <Nav menuItems={menuItems} />
        ) : (
          <FullHeightNav menuItems={menuItems} />
        )}
        <span className="md:hidden block">
          <Hamburger
            toggled={isOpen}
            toggle={handleMenuClick}
            direction="right"
            size={26}
          />
        </span>
      </div>
    </header>
  );
};

interface NavItemProps {
  menuItem: item;
  i: number;
}

interface NavProps {
  menuItems: item[];
}

export default Navbar;
