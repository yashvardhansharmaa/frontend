import { graphql, PageProps } from "gatsby";
import { FluidObject } from "gatsby-image";
import React, { FC } from "react";
import BlogListLayout from "../components/BlogListLayout";
import SEO from "../components/seo";
import { capitalize } from "../utils";
import compareDates from "../utils/compareDates";
import { PageContextType } from "./blog_list_template";

const category: FC<PageProps<categoryData, PageContextType>> = ({
  data,
  pageContext,
}) => {
  const { blogs, name } = data.strapi.category;
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `/${name}`
      : `/${name}/${(currentPage - 1).toString()}`;
  const nextPage = `/${name}/${(currentPage + 1).toString()}`;
  const paginateData = {
    isFirst,
    isLast,
    prevPage,
    numPages,
    currentPage,
    nextPage,
    isBlog: false,
    categoryName: name,
  };

  const posts = blogs.sort((a, b) => compareDates(a, b));
  const { url, height, width } = data.strapi.home.logo;

  return (
    <>
      <SEO title={capitalize(name)} image={{ url, height, width }} />
      <BlogListLayout posts={posts} paginateData={paginateData} />
    </>
  );
};

export default category;

export const query = graphql`
  query CategoryQuery($id: ID!, $start: Int!, $limit: Int!) {
    strapi {
      home {
        logo {
          url
          height
          width
        }
      }
      category(id: $id) {
        name
        blogs(limit: $limit, start: $start, sort: "published_date") {
          slug
          excerpt
          title
          authors {
            name
            pic {
              url
              imageFile {
                childImageSharp {
                  fluid(maxWidth: 80, maxHeight: 80) {
                    aspectRatio
                    base64
                    src
                    srcSet
                    sizes
                  }
                }
              }
            }
          }
          categories {
            name
          }
          published_date
          cover {
            url
            imageFile {
              childImageSharp {
                fluid {
                  aspectRatio
                  base64
                  sizes
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface categoryData {
  strapi: {
    home: {
      logo: {
        url: string;
        height: number;
        width: number;
      };
    };
    category: {
      name: string;
      blogs: {
        slug: string;
        excerpt: string;
        title: string;
        authors: {
          name: string;
          pic: {
            url: string;
            imageFile: {
              childImageSharp: {
                fluid: FluidObject;
              };
            };
          };
        }[];
        categories: {
          name: string;
        }[];
        published_date: string;
        cover: {
          url: string;
          imageFile: {
            childImageSharp: {
              fluid: FluidObject;
            };
          };
        };
      }[];
    };
  };
}
