import React, { FC, useState } from "react";
import styled from "styled-components";
import DarkLightSwitch from "./DarkLightSwitch";
import { menuItems, item, subItem } from "../assets/menuItems";
import logo from "../assets/logo.png";
import Hamburger from "hamburger-react";

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

interface NavItemProps {
  menuItem: item;
  i: number;
}

const NavItemWithDropdown = ({ menuItem, i }: NavItemProps) => {
  return (
    <div className="dropdown mr-5" key={i}>
      <button className="dropbtn">{menuItem.name}</button>
      <div
        className="dropdown-content hidden bg-gray-500 z-10 absolute"
        style={{ minWidth: "160px" }}
      >
        {menuItem.subItems?.map((subMenuItem: subItem, i2) => {
          return (
            <a href={subMenuItem.href} className="block" key={i2}>
              {subMenuItem.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

const NavItem = ({ menuItem, i }: NavItemProps) => {
  return (
    <a href={menuItem.link} key={i} className="mr-5">
      {menuItem.name}
    </a>
  );
};

const Nav = ({ menuItems }: { menuItems: item[] }) => {
  return (
    <nav className="md:ml-auto md:flex hidden items-center text-base justify-center">
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

const Navbar: FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  return (
    <header className="text-main bg-bgc body-font">
      <div className="container justify-between md:justify-start mx-auto flex p-5 flex-row items-center">
        <BrandLogo />
        <BrandTitle />
        <Nav menuItems={menuItems} />
        <span className="md:hidden block">
          <Hamburger
            toggled={isActive}
            toggle={handleMenuClick}
            direction="right"
            size={26}
          />
        </span>
      </div>
    </header>
  );
};

export default Navbar;
