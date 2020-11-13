import { graphql, PageProps, Link } from "gatsby";
import React, { FC, Fragment } from "react";
import Layout from "../components/Layout";
import { FluidObject } from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight as regularRightIcon,
  faArrowAltCircleLeft as regularLeftIcon,
} from "@fortawesome/free-regular-svg-icons";
import BlogCard from "../components/BlogCard";
import BigBlogCard from "../components/BigBlogCard";
import Container from "../components/Container";
import PostListContainer from "../components/PostListContainer";

const blog_list: FC<PageProps<BlogListData, PageContextType>> = ({
  data,
  pageContext,
}) => {
  // List of all blogs
  const posts = data.allStrapiBlogs.edges;

  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? `/blog` : `/blog/${(currentPage - 1).toString()}`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;

  return (
    <Layout>
      {/* <div className="md:mt-24 px-12 md:px-24 mx-auto container"> */}
      <Container>
        <PostListContainer>
          {/* First big post */}
          <BigBlogCard />
          {/* Consequent posts */}
          {/* {console.log(posts)} */}
          {posts.map(({ node }) => {
            return (
              <Fragment key={node.slug}>
                <BlogCard content={node} />
              </Fragment>
            );
          })}
        </PostListContainer>
        <div className="border border-white flex my-10 justify-center">
          <div className="border flex items-center border-white">
            {!isFirst && (
              <Link to={prevPage} rel="previous">
                <FontAwesomeIcon
                  className="mr-4"
                  icon={regularLeftIcon}
                  size="2x"
                />
              </Link>
            )}
            <ul className="flex items-center">
              {Array.from({ length: numPages }, (_, i) => (
                <>
                  {currentPage === i + 1 ? (
                    <Link
                      style={{
                        width: "30px",
                        height: "30px",
                        lineHeight: "30px",
                      }}
                      key={`pagination-number${i + 1}`}
                      to={`/blog/${i === 0 ? "" : i + 1}`}
                      className="flex justify-center items-center mx-1 border-2 border-primary p-0 rounded-full"
                    >
                      <li>{i + 1}</li>
                    </Link>
                  ) : (
                    <Link
                      key={`pagination-number${i + 1}`}
                      style={{ width: "25px", height: "25px" }}
                      to={`/blog/${i === 0 ? "" : i + 1}`}
                      className="mx-1 flex justify-center"
                    >
                      <li>{i + 1}</li>
                    </Link>
                  )}
                </>
              ))}
            </ul>
            {!isLast && (
              <Link to={nextPage}>
                <FontAwesomeIcon
                  icon={regularRightIcon}
                  className="ml-4"
                  size="2x"
                />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allStrapiBlogs(
      limit: $limit
      skip: $skip
      sort: { fields: published_date, order: DESC }
    ) {
      edges {
        node {
          slug
          author {
            name
            pic {
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
          body
          category {
            name
          }
          title
          published_date
          cover {
            childImageSharp {
              fluid(maxHeight: 80, maxWidth: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

interface BlogListData {
  allStrapiBlogs: {
    edges: {
      node: BlogListDataNode;
    }[];
  };
}

export interface BlogListDataNode {
  slug: string;
  author: {
    name: string;
    pic: {
      childImageSharp: {
        fluid: FluidObject;
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
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface PageContextType {
  currentPage: number;
  numPages: number;
}

export default blog_list;
