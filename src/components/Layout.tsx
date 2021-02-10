/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import React, { ReactNode } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

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
    <div className={`relative font-body ${className}`}>
      <Helmet>
        <meta
          name="google-site-verification"
          content="DLp1apA8li4Ua6cjM6bUBG43tQrmo__qHwRr9Bim3rI"
        />
      </Helmet>
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
