import { graphql } from "gatsby";
import React, { useEffect, useState } from "react";
import ReactMarkdown, { ReactMarkdownProps } from "react-markdown";
import Author from "../components/Author";
import Layout from "../components/Layout";
import { format } from "date-fns";
import Img, { FluidObject, FixedObject } from "gatsby-image";
import Tag from "../components/Tag";
// import ImageSlider from "../components/ImageSlider";
import ImageSliderSlick from "../components/ImageSliderSlick";

const Paragraph = ({ children }: { children: string }) => {
  return <p className="md:px-0 px-6 py-4">{children}</p>;
};

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img src={src} className="mx-auto medium-zoom" loading="lazy" alt={alt} />
  );
};

const Blog = ({ data }: { data: BlogData }) => {
  const blog = data.strapi.blog;

  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    setShouldRender(true);
  }, []);

  // Custom Elements for React Markdown
  const customRenderers = {
    paragraph: Paragraph,
    image: Image,
  };
  return (
    <Layout>
      <div className="flex flex-col items-center maindiv">
        <div className="container md:px-20 lg:px-48">
          <div className="pt-10 flex justify-center items-center">
            {/* Gatsby Image */}
            <Img
              fluid={blog.cover.imageFile.childImageSharp.fluid}
              className="md:w-1/2 w-full h-auto"
              alt="Cover Image"
            />
          </div>
          <div className="flex flex-col justify-center items-center my-10">
            <div
              className="flex justify-start opacity-75 text-sm items-start w-full md:px-0 px-5"
              style={{
                zIndex: -1,
              }}
            >
              {format(Date.parse(blog.published_date), "MMM d, Y")}
            </div>
            <h1 className="md:text-6xl text-5xl mx-6 text-center md:mx-0 my-5 font-heading">
              {blog.title}
            </h1>
          </div>
          <div className="text-lg leading-relaxed font-body">
            {/* <ReactMarkdown
              children={blog.body}
              allowDangerousHtml={true}
              renderers={customRenderers}
            /> */}
            <div dangerouslySetInnerHTML={{ __html: blog.body }}></div>
          </div>
          <div className="md:px-0 px-6 py-8">
            {/* TAGS */}
            <div className="px-2 md:px-6">
              <h2 className="text-3xl mb-2 font-heading">Tags:</h2>
              {blog.tags && (
                <>
                  {blog.tags.map((tag, i) => {
                    return <Tag tagName={tag.name} />;
                  })}
                </>
              )}
            </div>
            {/* AUTHOR */}
            <Author
              name={blog.author.name}
              pic={blog.author.pic.imageFile.childImageSharp.fixed}
              about={blog.author.about}
            />
          </div>
        </div>
        {/* <ImageSlider shouldRender={shouldRender} /> */}
        <ImageSliderSlick shouldRender={shouldRender} />
      </div>
    </Layout>
  );
};

export default Blog;

export const query = graphql`
  query BlogQuery($id: ID!) {
    strapi {
      blog(id: $id) {
        title
        tags {
          name
        }
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
        category {
          name
        }
        body
        published_date
        author {
          name
          about
          pic {
            url
            imageFile {
              childImageSharp {
                fixed(height: 80, width: 80) {
                  aspectRatio
                  base64
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

interface BlogData {
  strapi: {
    blog: {
      title: string;
      cover: {
        imageFile: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
      body: string;
      published_date: string;
      category: {
        name: string;
      };
      author: {
        name: string;
        about: string;
        pic: {
          imageFile: {
            childImageSharp: {
              fixed: FixedObject;
            };
          };
        };
      };
      tags: {
        name: string;
      }[];
    };
  };
}
