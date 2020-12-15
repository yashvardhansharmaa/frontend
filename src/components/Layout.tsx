/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import "./layout.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={`relative ${className}`}>
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
      {/* <div className="relative"> */}
      <Footer />
      {/* </div> */}
    </div>
  );
};

export default Layout;
