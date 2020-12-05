import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";
import { FluidObject } from "gatsby-image";
import BlogListLayout from "../components/BlogListLayout";
import compareDates from "../utils/compareDates";

const blog_list: FC<PageProps<BlogListData, PageContextType>> = ({
  data,
  pageContext,
}) => {
  // List of all blogs
  const posts = data.strapi.blogs.sort((a, b) => compareDates(a, b));

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? `/blog` : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;
  const paginateData = {
    isFirst,
    isLast,
    prevPage,
    numPages,
    currentPage,
    nextPage,
    isBlog: true,
  };

  return <BlogListLayout posts={posts} paginateData={paginateData} />;
};

export const blogListQuery = graphql`
  query BlogListQuery($start: Int!, $limit: Int!) {
    strapi {
      blogs(limit: $limit, start: $start, sort: "published_date") {
        slug
        body
        title
        author {
          name
          pic {
            url
            imageFile {
              childImageSharp {
                fluid(maxHeight: 80, maxWidth: 80) {
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
        category {
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
`;

interface BlogListData {
  strapi: {
    blogs: BlogListDataNode[];
  };
}

export interface BlogListDataNode {
  slug: string;
  author: {
    name: string;
    pic: {
      url: string;
      imageFile: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
  };
  body: string;
  category: {
    name: string;
  };
  title: string;
  published_date: string;
  cover: {
    imageFile: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}

export interface PageContextType {
  currentPage: number;
  numPages: number;
}

export default blog_list;
