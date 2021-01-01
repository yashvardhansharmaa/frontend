import React, { FC, useState } from "react";
import { graphql, Link, PageProps, useStaticQuery } from "gatsby";
import Container from "../components/Container";
import { BlogListDataNode } from "../templates/blog_list_template";
import BigBlogCard from "../components/BigBlogCard";
import BlogCard from "../components/BlogCard";
import PostListContainer from "../components/PostListContainer";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import MainFade from "../components/MainFade";
import Img, { FluidObject } from "gatsby-image";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import compareDates from "../utils/compareDates";
import { useTheme } from "../components/ThemeProvider";
import SEO from "../components/seo";
import NoImage from "../components/NoImage";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";

const IndexPage: FC<PageProps<Data>> = ({ data }) => {
  const { theme } = useTheme();

  const { url, height, width } = data.strapi.home.logo;
  var featuredBlogs = data.strapi.home.blogs.sort((a, b) => compareDates(a, b));
  const sortedBlogs = data.strapi.blogs
    .sort((a, b) => compareDates(a, b))
    .slice(0, 4);

  const counterDuration = 3;
  const [isActive, setIsActive] = useState(true);

  return (
    <Layout>
      <SEO title="Home" image={{ url, height, width }} />
      <Container>
        {/* RECENT */}
        <div>
          <h1 className="font-heading text-5xl">Recent Articles</h1>
          <MainFade>
            <BigBlogCard content={sortedBlogs[0]} />
          </MainFade>
          <PostListContainer>
            {sortedBlogs.map((blog, i) => {
              if (i === 0) return "";
              return <BlogCard key={i} content={blog} />;
            })}
          </PostListContainer>
          <div className="mt-10 flex justify-end md:mb-0 mb-20">
            <Link to="/blog">
              <button className="bg-primary md:py-2 py-1 px-2 md:px-3 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-md md:text-lg">
                Read More <FontAwesomeIcon icon={faArrowRight} className="" />
              </button>
            </Link>
          </div>
        </div>
      </Container>

      {/* ABOUT */}
      <div className="">
        <Container className="flex flex-col items-center">
          <MainFade>
            <div className="md:w-1/5 w-1/4 mt-10">
              {theme ? (
                <>
                  {data.strapi.home.logo_black ? (
                    <Img
                      fluid={
                        data.strapi.home.logo_black.imageFile.childImageSharp
                          .fluid
                      }
                      className="w-full"
                    />
                  ) : (
                    <NoImage className="w-full" />
                  )}
                </>
              ) : (
                <>
                  {data.strapi.home.logo ? (
                    <Img
                      fluid={
                        data.strapi.home.logo.imageFile.childImageSharp.fluid
                      }
                      className="w-full"
                    />
                  ) : (
                    <NoImage className="w-full" />
                  )}
                </>
              )}
            </div>
            <Heading className="">Tidings Media</Heading>
            <p className="text-lg text-center">
              Where we discuss economics, history, and everything in between.
            </p>
          </MainFade>

          {/* STATS */}
          <MainFade>
            <div className="my-10 w-full flex md:flex-row flex-col justify-around">
              <div className="flex md:m-0 mb-4 flex-col justify-end items-center">
                <p
                  style={{ opacity: "0.6" }}
                  className="font-heading text-5xl md:text-6xl"
                >
                  <CountUp
                    end={parseInt(data.strapi.home.articles_published)}
                    duration={counterDuration}
                  >
                    {({ countUpRef, start }) => (
                      <TrackVisibility once partialVisibility tag="span">
                        {({ isVisible }) => {
                          if (isVisible && isActive) {
                            start!();
                            setIsActive(false);
                          }
                          return <span ref={countUpRef} />;
                        }}
                      </TrackVisibility>
                    )}
                  </CountUp>
                  +
                </p>
                <p className="pb-2 uppercase text-lg">Articles Published</p>
                <div className="hidden md:block">
                  <Link to="/work-with-us">
                    <button className="py-1 px-3 text-bgc border-0 bg-gbtn focus:outline-none hover:bg-gbtnh rounded text-lg">
                      Join Us
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col md:m-0 mb-4 justify-center items-center">
                <p
                  style={{ opacity: "0.6" }}
                  className="font-heading text-5xl md:text-6xl"
                >
                  <CountUp
                    end={parseInt(data.strapi.home.people_reached)}
                    duration={counterDuration}
                  >
                    {({ countUpRef, start }) => (
                      <TrackVisibility once partialVisibility tag="span">
                        {({ isVisible }) => {
                          if (isVisible && isActive) {
                            start!();
                          }
                          return <span ref={countUpRef} />;
                        }}
                      </TrackVisibility>
                    )}
                  </CountUp>
                  +
                </p>

                <p className="pb-2 uppercase text-lg">People Reached</p>
                <div className="hidden md:block">
                  <Link to="/blog">
                    <button className="bg-primary py-2 px-4 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-lg">
                      Start Reading!
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col md:m-0 mb-4 justify-center items-center">
                <p
                  style={{ opacity: "0.6" }}
                  className="font-heading text-5xl md:text-6xl"
                >
                  <CountUp
                    end={parseInt(data.strapi.home.countries_reached)}
                    duration={counterDuration}
                  >
                    {({ countUpRef, start }) => (
                      <TrackVisibility once partialVisibility tag="span">
                        {({ isVisible }) => {
                          if (isVisible && isActive) {
                            start!();
                          }
                          return <span ref={countUpRef} />;
                        }}
                      </TrackVisibility>
                    )}
                  </CountUp>
                  +
                </p>
                <p className="pb-2 uppercase text-lg">Countries Reached</p>
                <div className="hidden md:block">
                  <Link to="/about">
                    <button className="bg-gbtn py-1 px-3 text-bgc border-0 focus:outline-none hover:bg-gbtnh rounded text-lg">
                      Learn More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:hidden flex justify-center mt-6">
                <Link to="/blog">
                  <button className="bg-primary py-2 px-4 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-lg">
                    Start Reading!
                  </button>
                </Link>
              </div>
            </div>
          </MainFade>

          {/* Our Mission */}
          <MainFade>
            <h1
              style={{ opacity: 0.9 }}
              className="font-heading mt-20 text-7xl border-b-3 border-primary"
            >
              Our Mission
            </h1>
            <div className="flex w-full md:flex-row flex-col mt-32 mb-40 items-center md:justify-around">
              <p className=" text-2xl text-center mb-10 md:mb-0 w-3/4 md:w-1/4">
                Educate the masses on economics and history
              </p>
              <p className=" text-2xl text-center w-3/4 mt-10 md:mt-0 md:w-1/4">
                Help students articulate and write better
              </p>
            </div>
          </MainFade>
        </Container>
      </div>

      {/* Featured Articles */}
      <Container className="mb-20">
        <MainFade>
          <h1 className="font-heading mt-5 md:mt-0 text-5xl">
            Featured Articles
          </h1>
        </MainFade>
        <PostListContainer>
          {featuredBlogs.map((blog, i) => {
            return <BlogCard key={i} content={blog} />;
          })}
        </PostListContainer>
      </Container>
    </Layout>
  );
};

interface Data {
  strapi: {
    blogs: BlogListDataNode[];
    home: {
      company: string;
      desciption: string;
      people_reached: string;
      countries_reached: string;
      articles_published: string;
      blogs: BlogListDataNode[];
      logo: {
        height: number;
        width: number;
        url: string;
        imageFile: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
      logo_black: {
        imageFile: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
    };
  };
}

export default IndexPage;

export const indexQuery = graphql`
  query IndexQuery {
    strapi {
      home {
        company
        desciption
        people_reached
        countries_reached
        articles_published
        logo {
          url
          height
          width
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
        logo_black {
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
        blogs(where: { status: "published" }, sort: "published_date") {
          slug
          title
          published_at
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
          excerpt
          published_date
          authors {
            name
            pic {
              url
              imageFile {
                childImageSharp {
                  fluid(maxHeight: 80, maxWidth: 80) {
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

      blogs(where: { status: "published" }) {
        slug
        title
        published_at
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
        excerpt
        published_date
        authors {
          name
          pic {
            url
            imageFile {
              childImageSharp {
                fluid(maxHeight: 80, maxWidth: 80) {
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
