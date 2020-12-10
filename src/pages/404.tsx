import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Light404 from "../assets/404-light.svg";
import Dark404 from "../assets/404-dark.svg";
import { Link } from "gatsby";
import { useTheme } from "../components/ThemeProvider";

const NotFoundPage = () => {
  const { theme } = useTheme();
  return (
    <Layout>
      <SEO title="404: Not found" />
      <div className="flex w-full mt-32 mb-10 flex-col justify-center items-center px-5">
        {theme ? (
          <img src={Dark404} alt="404 Image" />
        ) : (
          <img src={Light404} alt="404 Image" />
        )}
        <h1 className="text-6xl font-heading">Ooops!</h1>
        <p className="text-xl blog">
          It seems you are lost, please go back to the{" "}
          <Link to="/">home page.</Link>
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
