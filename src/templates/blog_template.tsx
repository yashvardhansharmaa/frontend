import { graphql, PageProps } from "gatsby";
import React, { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Author from "../components/Author";
import Layout from "../components/Layout";
import { format } from "date-fns";
import Img, { FluidObject, FixedObject } from "gatsby-image";
import Tag from "../components/Tag";
import ImageSliderSlick from "../components/ImageSliderSlick";
import {
  Image,
  Paragraph,
  Heading,
  HorizontalRule,
  Blockquote,
  Link,
  List,
} from "../components/Markdown";
import SEO from "../components/seo";
import ShareButtons from "../components/ShareButtons";
import NoImage from "../components/NoImage";
import TrackVisibility from "react-on-screen";

// Custom Elements for React Markdown
export const customRenderers = {
  paragraph: Paragraph,
  image: Image,
  heading: Heading,
  thematicBreak: HorizontalRule,
  blockquote: Blockquote,
  link: Link,
  list: List,
};

const Blog: FC<PageProps<BlogData>> = ({ data, location }) => {
  const blog = data.strapi.blog;
  const company = data.strapi.navbar.company;
  let tagsList: string[] = [];
  blog.tags.map((tag) => tagsList.push(tag.name));

  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    setShouldRender(true);
  }, []);

  const [shouldButtonsRender, setShouldButtonsRender] = useState(true);

  const imageObj = {
    url: blog.cover ? blog.cover.url : "../assets/images/noimage-white.png",
    height: blog.cover ? blog.cover.height : 50,
    width: blog.cover ? blog.cover.width : 50,
  };

  return (
    <Layout>
      <SEO
        title={blog.title}
        blog={true}
        description={blog.excerpt}
        image={imageObj}
        authors={blog.authors.map((author) => author.name)}
        keywords={data.strapi.blog.keywords_list?.map(k => k.keyword)}
      />
      <ShareButtons
        url={location.href}
        title={`Read this article by ${company} on ${blog.title}`}
        tags={tagsList}
        // className="fixed xl:ml-32 ml-20 lg:flex hidden flex-col"
        className={
          shouldButtonsRender
            ? "fixed xl:ml-32 ml-20 lg:flex hidden flex-col"
            : "fixed xl:ml-32 ml-20 hidden flex-col"
        }
        style={{ top: "40%", zIndex: 1 }}
        childClassName="mb-4"
      />
      <div className="mt-24">
        <div className="maindiv relative">
          <div className="flex flex-col items-center relative">
            <div className="container md:px-56 lg:px-56">
              <div className="pt-10 flex justify-center items-center">
                {blog.cover ? (
                  <Img
                    fluid={blog.cover.imageFile.childImageSharp.fluid}
                    className="md:w-1/2 w-full h-auto"
                    alt="Cover Image"
                  />
                ) : (
                  <NoImage className="md:w-1/2 w-full h-auto" />
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-10 mb-5">
                <div
                  className="flex justify-start opacity-75 text-sm items-start w-full md:px-0 px-5"
                  style={{
                    zIndex: -1,
                  }}
                >
                  {format(Date.parse(blog.published_date), "MMM d, Y")}
                </div>
                <h1 className="md:text-5xl leading-snug text-4xl mx-6 text-center md:mx-0 mt-5 heading">
                  {blog.title}
                </h1>
              </div>
              <div className="text-lg leading-relaxed blog-body">
                <ReactMarkdown
                  children={blog.body}
                  allowDangerousHtml={true}
                  renderers={customRenderers}
                  className="blog"
                />
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
                <div
                  className="mt-12"
                  style={{
                    borderBottom: "1px solid var(--author-border)",
                    borderTop: "1px solid var(--author-border)",
                  }}
                >
                  {blog.authors.map((author) => (
                    <Author
                      name={author.name}
                      pic={author.pic}
                      about={author.about}
                    />
                  ))}
                </div>
                <div
                  className="mx-5 mt-5 pb-5 blog"
                  style={{ borderBottom: "1px solid var(--author-border)" }}
                >
                  <h1 className="font-heading text-4xl text-center">
                    References
                  </h1>
                  <div className="md:w-4/5  w-full p-2 flex flex-col justify-center mx-auto">
                    <ul className="list-disc w-full">
                      {blog.References.map(({ display_text, url }) => (
                        <li className="w-full my-4">
                          <a
                            style={{
                              display: "block",
                              wordWrap: "break-word",
                            }}
                            rel="noopener noreferrer"
                            className="h-full m-0"
                            target="_blank"
                            href={url}
                          >
                            <span>{display_text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    {/* {blog.References.map(({ display_text, url }) => (
                    <a
                      style={{ display: "block", overflow: "hidden" }}
                      rel="noopener noreferrer"
                      className="w-full h-full m-0"
                      target="_blank"
                      href={url}
                    >
                      <span>{display_text}</span>
                    </a>
                  ))} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="my-12 block lg:hidden">
              <p> If you found this article, please share it:</p>
              <div className="flex justify-center">
                <ShareButtons
                  url={location.href}
                  title={`Read this article by ${company} on ${blog.title}`}
                  tags={tagsList}
                  className="flex lg:hidden my-2"
                  childClassName="mr-2"
                />
              </div>
            </div>
          </div>
          <TrackVisibility partialVisibility tag="div">
            {({ isVisible }) => {
              setShouldButtonsRender(!isVisible);
              return <ImageSliderSlick shouldRender={shouldRender} />;
            }}
          </TrackVisibility>
        </div>
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
        keywords_list {
          keyword
        }
        cover {
          url
          width
          height
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
        categories {
          name
        }
        body
        excerpt
        published_date
        References {
          display_text
          url
        }
        authors {
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
      navbar {
        company
      }
    }
  }
`;

interface BlogData {
  strapi: {
    blog: {
      title: string;
      cover: {
        url: string;
        height: number;
        width: number;
        imageFile: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
      keywords_list?: {
        keyword: string
      }[]
      body: string;
      excerpt: string;
      published_date: string;
      categories: {
        name: string;
      }[];
      authors: {
        name: string;
        about: string;
        pic: {
          imageFile: {
            childImageSharp: {
              fixed: FixedObject;
            };
          };
        };
      }[];
      tags: {
        name: string;
      }[];
      References: {
        display_text: string;
        url: string;
      }[];
    };
    navbar: {
      company: string;
    };
  };
}
