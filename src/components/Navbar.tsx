import React, { FC } from "react";
import styled from "styled-components";
import DarkLightSwitch from "./DarkLightSwitch";
import { menuItems, item } from "../assets/menuItems";

const Logo = styled.img`
  height: 50px;
  width: 50px;
`;

const Navbar: FC = () => {
  return (
    <header className="text-main bg-bgc body-font">
      <div className="container mx-auto border border-white flex flex-wrap p-5 flex-row items-center">
        <a href="/" className="flex">
          <Logo
            src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6ed17a6e-0571-4e04-b67d-e29b31cdc3bf/Asset_2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201021%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201021T192645Z&X-Amz-Expires=86400&X-Amz-Signature=6e694a8d3d524bcc5d3b21553fcd52a77740a1cd4a868b95c7e996d7f257c373&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Asset_2.png%22"
            alt=""
            className="mx-3 border border-white"
          />
          <div className="md:flex hidden justify-center mx-3">
            <span className="bg-primary h-100" style={{ width: "2px" }}></span>
          </div>
          <div className="mx-3 flex border border-white text-lg justify-center items-center">
            The Tidings Blog
          </div>
        </a>
        <nav className="md:ml-auto md:flex hidden flex-wrap items-center text-base justify-center">
          {menuItems.map((menuItem: item, i: number) => {
            return (
              <a href={menuItem.link} className="mr-5 hover:text-white">
                {menuItem.name}
              </a>
            );
          })}
        </nav>
        <DarkLightSwitch />
      </div>
    </header>
  );
};

export default Navbar;
