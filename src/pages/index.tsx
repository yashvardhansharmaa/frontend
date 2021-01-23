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
import Testimonials, { TestimonialsData } from "../components/Testimonials";

/**
 * /static/5d484f953cd3205999e3dd3e2f93066f/ee604/undraw_conference_call_b0w6.png
 * /static/b4585f0e39a259d0ab8f2fbdc9b8c5aa/ee604/undraw_publish_article_icso.png
 * /static/c9a1f9e068f17d605933bcac791df1df/ee604/undraw_reading_time_gvg0.png
 * /static/26ee3fea5ef43cae28629082ae7a54ec/ee604/undraw_shared_workspace_hwky.png
 * /static/a9765fb4147f9eb4dfa10ac8cb8204d8/ee604/clip-education.png
 */

const IndexPage: FC<PageProps<Data>> = ({ data }) => {
  const { theme } = useTheme();

  const { url, height, width } = data.strapi.home.logo;
  var featuredBlogs = data.strapi.home.blogs.sort((a, b) => compareDates(a, b));
  const sortedBlogs = data.strapi.blogs
    .sort((a, b) => compareDates(a, b))
    .slice(0, 4);

  const counterDuration = 3;
  const [isActive, setIsActive] = useState(true);

  const Logo = () => (
    <>
      {theme ? (
        <>
          {data.strapi.home.logo_black ? (
            <Img
              fluid={
                data.strapi.home.logo_black.imageFile.childImageSharp.fluid
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
              fluid={data.strapi.home.logo.imageFile.childImageSharp.fluid}
              className="w-full"
            />
          ) : (
            <NoImage className="w-full" />
          )}
        </>
      )}
    </>
  );

  return (
    <Layout>
      <SEO title="Home" image={{ url, height, width }} />
      <Container>
        {/* RECENT */}
        <div>
          <h1 className="font-subheading text-4xl text-center md:text-left md:text-5xl">
            Recent Articles
          </h1>
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

      <Container>
        <div
          style={{
            borderLeft: "6px solid var(--primary)",
          }}
          className="w-full text-center py-8 bg-tcard rounded-md"
        >
          {/* <h2 className="font-subheading text-3xl">Note!</h2> */}
          www.tidingsmedia was formerly known as thetidingsblog.com; please
          check out the latter for all 200+ blog archived posts
        </div>
      </Container>

      {/* ABOUT */}
      <div className="">
        <Container className="flex flex-col items-center">
          <MainFade>
            <div className="md:w-1/5 w-1/4 mt-10">
              <Logo />
            </div>
            <h1 className="md:text-7xl text-6xl font-subheading text-center uppercase">
              <span className="md:text-8xl text-7xl">T</span>idings{" "}
              <span className="md:text-8xl text-7xl">M</span>edia
            </h1>
            <p className="text-lg text-center">
              Where we discuss economics, history, and everything in between.
            </p>
          </MainFade>

          {/* STATS */}
          <MainFade>
            <div className="my-10 w-full flex md:flex-row flex-col justify-around">
              <div className="flex md:m-0 mb-4 flex-col justify-end items-center">
                <p
                  className="font-subheading text-5xl md:text-6xl"
                  style={{
                    fontWeight: 500,
                  }}
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
                  style={{ fontWeight: 500 }}
                  className="font-subheading text-5xl md:text-6xl"
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
                  style={{ fontWeight: 500 }}
                  className="font-subheading text-5xl md:text-6xl"
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
          {/* Help students articulate and write better */}
          <MainFade>
            <h1
              style={{ opacity: 0.9 }}
              className="font-subheading mt-20 text-5xl md:text-7xl border-b-3 border-primary"
            >
              Our Mission
            </h1>
            <div className="flex w-full md:flex-row flex-col mt-32 mb-40 items-center md:justify-around">
              <div className="">
                <div className="w-1/2 mx-auto mb-4">
                  <Img fluid={data.educationPic.fluid} />
                </div>
                <p className="mx-auto text-2xl text-center mb-10 md:mb-0 w-3/4 md:w-1/2">
                  Educate the masses on economics and history
                </p>
              </div>
              <div className="">
                <div className="w-1/2 mx-auto mb-4">
                  <Img fluid={data.readingTimePic.fluid} />
                </div>
                <p className="mx-auto text-2xl text-center mb-10 md:mb-0 w-3/4 md:w-1/2">
                  Help students articulate and write better
                </p>
              </div>
            </div>
          </MainFade>
        </Container>
      </div>

      <Testimonials data={data.strapi.testimonials} />

      {/* Featured Articles */}
      <Container className="mb-20">
        <MainFade>
          <h1 className="font-subheading mt-5 md:mt-0 text-4xl text-center md:text-left md:text-5xl">
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
  educationPic: {
    fluid: FluidObject;
  };
  readingTimePic: {
    fluid: FluidObject;
  };
  strapi: {
    testimonials: TestimonialsData[];
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
    educationPic: imageSharp(
      fluid: {
        src: {
          eq: "/static/a9765fb4147f9eb4dfa10ac8cb8204d8/ee604/clip-education.png"
        }
      }
    ) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
    readingTimePic: imageSharp(
      fluid: {
        src: {
          eq: "/static/c9a1f9e068f17d605933bcac791df1df/ee604/undraw_reading_time_gvg0.png"
        }
      }
    ) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
    strapi {
      testimonials {
        name
        testimonial
        userTitle
        pic {
          url
          imageFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
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
          categories {
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
        categories {
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
