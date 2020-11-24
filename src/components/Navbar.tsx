import React, { FC, Fragment, useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import DarkLightSwitch from "./DarkLightSwitch";
import Hamburger from "hamburger-react";
import "../assets/styles/navbar.scss";
import NavLink from "./NavLink";
import { FluidObject } from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data: NavbarData = useStaticQuery(graphql`
    query NavbarQuery {
      strapi {
        navbarItems {
          name
          link
          nav_sub_item {
            link
            name
          }
          order
        }
        navbar {
          logo {
            url
            imageFile {
              childImageSharp {
                fixed(width: 50, height: 50) {
                  src
                }
              }
            }
          }
          company
        }
      }
    }
  `);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const RenderNavItems = ({ menuItems }: NavItemsProp) => {
    menuItems.sort((a, b) => {
      return a.order - b.order;
    });
    return (
      <>
        {menuItems.map((menuItem, i: number) => {
          return (
            <Fragment key={i}>
              {menuItem.nav_sub_item ? (
                <div
                  className={
                    !isOpen ? `dropdown mr-5` : `dropdown mr-5 mb-5 text-xl`
                  }
                >
                  {menuItem.link ? (
                    <NavLink
                      to={menuItem.link}
                      className="dropbtn focus:outline-none"
                    >
                      {menuItem.name}
                    </NavLink>
                  ) : (
                    <p className="dropbtn focus:outline-none cursor-pointer">
                      {menuItem.name}
                    </p>
                  )}
                  <div
                    className="dropdown-content hidden z-10 absolute"
                    style={{ minWidth: "160px" }}
                  >
                    {menuItem.nav_sub_item?.map((subMenuItem, i2) => {
                      return (
                        <NavLink
                          to={subMenuItem.link}
                          className="block px-4 py-2"
                          key={i2}
                        >
                          {subMenuItem.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <>
                  {menuItem.link ? (
                    <NavLink
                      to={menuItem.link}
                      key={i}
                      className={!isOpen ? `mr-5` : `mb-5 mr-5 text-xl`}
                    >
                      {menuItem.name}
                    </NavLink>
                  ) : (
                    <p
                      className={
                        !isOpen
                          ? `mr-5 cursor-pointer`
                          : `mb-5 mr-5 cursor-pointer text-xl`
                      }
                    >
                      {menuItem.name}
                    </p>
                  )}
                </>
              )}
            </Fragment>
          );
        })}
      </>
    );
  };

  const Nav = ({ menuItems }: NavItemsProp) => {
    return (
      <nav className="md:ml-auto md:flex hidden items-center text-base justify-center">
        <RenderNavItems menuItems={menuItems} />
        <Link to="/search">
          <FontAwesomeIcon fillOpacity={0.7} className="mr-4" icon={faSearch} />
        </Link>
        <DarkLightSwitch />
      </nav>
    );
  };

  const FullHeightNav = ({ menuItems }: NavItemsProp) => {
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
      {/* <Logo src={logo} alt="" className="mx-3 " /> */}
      <img
        src={data.strapi.navbar.logo.imageFile.childImageSharp.fixed.src}
        alt=""
      />
      <div className="md:flex hidden justify-center mx-3">
        <span className="bg-primary h-100" style={{ width: "2px" }}></span>
      </div>
    </a>
  );

  const BrandTitle = () => (
    <a href="/">
      <div className="mx-3 flex text-lg justify-center items-center">
        {data.strapi.navbar.company}
      </div>
    </a>
  );

  return (
    <header
      className={
        !isOpen
          ? `text-main bg-bgc z-10 body-font min-h-10vh md:fixed md:top-0 md:left-0 w-full`
          : `text-main bg-bgc z-10 body-font h-screen md:fixed md:top-0 md:left-0 w-full`
      }
      style={{
        transition: "height 0.5s ease",
      }}
    >
      {/* {console.log(data)} */}
      <div className="container relative justify-between md:justify-start mx-auto flex p-5 flex-row items-center">
        <BrandLogo />
        <BrandTitle />
        {!isOpen ? (
          <Nav menuItems={data.strapi.navbarItems} />
        ) : (
          <FullHeightNav menuItems={data.strapi.navbarItems} />
        )}
        <span className="md:hidden flex items-center block">
          <Link to="/search">
            <FontAwesomeIcon className="mr-2" icon={faSearch} />
          </Link>
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

interface NavbarData {
  strapi: {
    navbarItems: {
      name: string;
      link?: string | null;
      nav_sub_item?: {
        link: string;
        name: string;
      }[];
      order: number;
    }[];
    navbar: {
      logo: {
        url: string;
        imageFile: {
          childImageSharp: {
            fixed: {
              src: string;
            };
          };
        };
      };
      company: string;
    };
  };
}

interface strapiNavbarItem {
  name: string;
  link?: string | null;
  nav_sub_item?: {
    link: string;
    name: string;
  }[];
  order: number;
}

interface NavItemProp {
  menuItem: strapiNavbarItem;
  i: number;
}

interface NavItemsProp {
  menuItems: strapiNavbarItem[];
}

export default Navbar;
