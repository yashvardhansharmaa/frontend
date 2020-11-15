import { graphql, PageProps } from "gatsby";
import { FluidObject } from "gatsby-image";
import React, { FC } from "react";
import BlogCard from "../components/BlogCard";
import BlogListLayout from "../components/BlogListLayout";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PostListContainer from "../components/PostListContainer";
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
  return <BlogListLayout posts={blogs.reverse()} paginateData={paginateData} />;
};

export default category;

export const query = graphql`
  query CategoryQuery($id: ID!, $start: Int!, $limit: Int!) {
    strapi {
      category(id: $id) {
        name
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
  }
`;

interface categoryData {
  strapi: {
    category: {
      name: string;
      blogs: {
        slug: string;
        body: string;
        title: string;
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
        category: {
          name: string;
        };
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
