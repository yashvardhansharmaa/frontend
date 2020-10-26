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

const Layout = ({ children }: { children: ReactNode }) => {
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
    <>
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
