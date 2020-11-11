import { graphql } from "gatsby";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PostListContainer from "../components/PostListContainer";
import { capitalize } from "../utils";

const Tags = ({ data }: { data: tagData }) => {
  const { name } = data.strapi.tag;
  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-heading">{name}</h1>
        <PostListContainer>
          <p>hi</p>
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
          body
          title
          author {
            name
            pic {
              url
              imageFile {
                childImageSharp {
                  fixed(height: 80, width: 80) {
                    aspectRatio
                    base64
                    src
                    srcSet
                    height
                    width
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

interface tagData {
  strapi: {
    tag: {
      name: string;
    };
  };
}
export default Tags;
