import { graphql } from "gatsby";
import { FluidObject } from "gatsby-image";
import React from "react";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PostListContainer from "../components/PostListContainer";

const author = ({ data }: { data: authorData }) => {
  const { name, pic, blogs } = data.strapi.author;
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
  query AuthorQuery($id: ID!) {
    strapi {
      author(id: $id) {
        name
        pic {
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
          url
        }
        blogs(where: { status: "published" }) {
          body
          slug
          title
          cover {
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
            url
          }
          category {
            name
          }
          author {
            name
            pic {
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
              url
            }
          }
          published_date
        }
      }
    }
  }
`;

interface authorData {
  strapi: {
    author: {
      name: string;
      pic: {
        imageFile: {
          childImageSharp: FluidObject;
        };
      };
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

export default author;
