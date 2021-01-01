import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import React from "react";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PostListContainer from "../components/PostListContainer";

const Tags = ({ data }: { data: tagData }) => {
  const { name, blogs } = data.strapi.tag;
  return (
    <Layout>
      <Container>
        <h1 className="md:text-6xl text-5xl font-heading">{name}</h1>
        <PostListContainer>
          {blogs.map((blog, i: number) => {
            return <BlogCard key={i} content={blog} />;
          })}
        </PostListContainer>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query tagQuery($id: ID!) {
    strapi {
      tag(id: $id) {
        name
        blogs {
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

interface tagData {
  strapi: {
    tag: {
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
export default Tags;
