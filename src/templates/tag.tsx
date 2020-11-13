import { graphql } from "gatsby";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PostListContainer from "../components/PostListContainer";
import { FixedObject, FluidObject } from "gatsby-image";
import BlogCard from "../components/BlogCard";

const Tags = ({ data }: { data: tagData }) => {
  const { name, blogs } = data.strapiTags;
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
  query TagQuery($name: String!) {
    strapiTags(name: { eq: $name }) {
      name
      blogs {
        title
        body
        author {
          name
          pic {
            childImageSharp {
              fluid(maxHeight: 80, maxWidth: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        category {
          name
        }
        cover {
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
        slug
        published_date
      }
    }
  }
`;

interface tagData {
  strapiTags: {
    name: string;
    blogs: {
      title: string;
      body: string;
      author: {
        name: string;
        pic: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
      category: {
        name: string;
      };
      cover: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
      slug: string;
      published_date: string;
    }[];
  };
}

export default Tags;
