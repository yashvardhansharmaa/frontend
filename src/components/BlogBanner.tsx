import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { capitalize } from "../utils";

const BlogBanner = () => {
  const data = useStaticQuery<BannerData>(graphql`
    query BannerQuery {
      strapi {
        categories {
          name
        }
      }
    }
  `);

  // this link will be active when itself or deeper routes
  // are current
  const isPartiallyActive = ({
    isPartiallyCurrent,
  }: {
    isPartiallyCurrent: boolean;
  }) => {
    return isPartiallyCurrent ? { className: "opacity-100" } : {};
  };

  const categories = data.strapi.categories;
  return (
    <ul className="w-full bg-fg1 shadow-1dp text-md md:text-xl rounded-lg py-2 px-2 flex justify-around">
      <li className="md:px-10">
        <Link
          getProps={isPartiallyActive}
          className="opacity-75 hover:opacity-100"
          to="/blog"
        >
          All Posts
        </Link>
      </li>
      {/* List all categories */}
      {categories.map((category, i) => (
        <li key={i} className="md:px-10">
          <Link
            activeClassName="opacity-100"
            className="opacity-75 hover:opacity-100"
            to={`/${category.name}`}
          >
            {capitalize(category.name)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

interface BannerData {
  strapi: {
    categories: {
      name: string;
    }[];
  };
}

export default BlogBanner;
