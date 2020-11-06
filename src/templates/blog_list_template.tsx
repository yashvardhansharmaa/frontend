import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import Img, { FluidObject } from "gatsby-image";
import { format } from "date-fns";

const blog_list = ({ data }: { data: BlogListData }) => {
  // List of all blogs
  const posts = data.allStrapiBlogs.edges;

  const BigPost = () => (
    <div className="md:grid my-5 flex flex-col md:grid-cols-2">
      <img
        src="https://source.unsplash.com/bli6Z7xsPGE"
        className="w-full rounded-lg"
        alt=""
      />
      <div className="md:px-5 py-2 flex flex-col justify-between">
        <div className="">
          <div className="text-sm">
            <span className="font-semibold">Economics </span>|{" "}
            <span className="opacity-75"> November 2, 2020 </span>
          </div>
          <h1 className="text-4xl py-2 font-heading">
            History of the Nuremberg Laws
          </h1>
          <p className="leading-loose">
            The creation of the Nazi Party in 1920, after Germany’s loss in
            World War I, was a monumental period in history.
          </p>
        </div>
        <div className="mt-1 md:mt-0 flex">
          <img
            className="md:h-12 md:w-12 h-8 w-8 rounded-full"
            src="https://res.cloudinary.com/mihirgupta22/image/upload/v1604430975/small_Mihir_Gupta_square_718b30e40b.jpg"
            alt=""
          />
          <span className="mx-2 mt-1 font-semibold">Mihir Gupta</span>
        </div>
      </div>
    </div>
  );

  const NormalPost = ({
    cover,
    category,
    published_date,
    title,
    excerpt,
    author_pic,
    author_name,
  }: PostType) => (
    <div className="flex my-5 border border-white w-full md:w-2/5 flex-col">
      <Img fluid={cover} className="rounded-lg w-full" alt={title} />
      <div className="text-sm mt-1">
        <span className="font-semibold">{category} </span>|{" "}
        <span className="opacity-75">
          {format(Date.parse(published_date), "MMM d, Y")}
        </span>
      </div>
      <h1 className="text-3xl py-2 font-heading">{title}</h1>
      <p className="leading-relaxed">{excerpt}</p>
      <div className="flex mt-2">
        <Img
          className="h-8 w-8 rounded-full"
          fluid={author_pic}
          alt={author_name}
        />
        <span className="mx-2 mt-1 font-semibold">{author_name}</span>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* {console.log(posts)} */}
      <div className="md:mt-24 px-12 flex flex-wrap justify-between md:px-24 mx-auto container">
        {/* First big post */}
        <BigPost />
        {/* Consequent posts */}
        {console.log(posts)}
        {posts.map(
          ({
            node: {
              author,
              category,
              cover,
              published_date,
              title,
              body,
              slug,
            },
          }) => {
            return (
              <>
                {console.log(author.pic)}
                <NormalPost
                  author_name={author.name}
                  author_pic={author.pic.childImageSharp.fluid}
                  category={category.name}
                  cover={cover.childImageSharp.fluid}
                  published_date={published_date}
                  title={title}
                  excerpt={body.substring(0, 140)}
                  key={slug}
                />
              </>
            );
          }
        )}
      </div>
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
  allStrapiBlogs: {
    edges: {
      node: {
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
      };
    }[];
  };
}

interface PostType {
  cover: FluidObject;
  category: string;
  published_date: string;
  title: string;
  excerpt: string;
  author_pic: FluidObject;
  author_name: string;
}

export default blog_list;
