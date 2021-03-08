import React, { FC, useEffect, useState } from "react";
import { graphql, Link, PageProps } from "gatsby";
import Container from "../components/Container";
import { BlogListDataNode } from "../templates/blog_list_template";
import BigBlogCard from "../components/BigBlogCard";
import BlogCard from "../components/BlogCard";
import PostListContainer from "../components/PostListContainer";
import Layout from "../components/Layout";
import MainFade from "../components/MainFade";
import Img, { FluidObject } from "gatsby-image";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import compareDates from "../utils/compareDates";
import { useTheme, useTimesVisited } from "../components/ThemeProvider";
import SEO from "../components/seo";
import NoImage from "../components/NoImage";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";
import Testimonials, { TestimonialsData } from "../components/Testimonials";
import ReactMarkdown from "react-markdown";
import Popup from "reactjs-popup";

const IndexPage: FC<PageProps<Data>> = ({ data }) => {
  const { theme } = useTheme();

  const { url, height, width } = data.strapi.home.logo;
  var featuredBlogs = data.strapi.home.blogs.sort((a, b) => compareDates(a, b));
  const sortedBlogs = data.strapi.blogs
    .sort((a, b) => compareDates(a, b))
    .slice(0, 4);

  const counterDuration = 3;
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [email, setEmail] = useState("");
  const { timesVisited, increaseTimesVisited } = useTimesVisited();

  useEffect(() => {
    // setTimeout(() => {
    //   if (timesVisited < 1) {
    //     setIsModalOpen(true);
    //     setIsBlur(true);
    //     increaseTimesVisited();
    //   }
    // }, 5000);
  }, [])

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
    <>
      {/* <Popup
        open={isModalOpen}
        onClose={() => setIsBlur(false)}
        position="top center"
      >
        <MainFade>
          <div className="md:w-1/2 w-full md:pr-0 pr-4 mt-6 flex justify-end mx-auto">
            <button className="outline-none focus:outline-none text-white w-4 h-4">
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => {
                  setIsBlur(false);
                  setIsModalOpen(false);
                }}
              />
            </button>
          </div>
          <div className="w-full flex pt-6 pb-4 justify-center items-center flex-col">
            <h2 className="text-center text-white md:text-4xl text-2xl uppercase font-heading">
              Subscribe to our mailing list!
            </h2>
            <form
              action="https://thetidingsblog.us10.list-manage.com/subscribe/post"
              method="POST"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate w-full justify-center items-center mx-auto md:mt-4 mt-6"
              target="_blank"
              noValidate
            >
              <input type="hidden" name="u" value={process.env.GATSBY_MC_U} />
              <input type="hidden" name="id" value={process.env.GATSBY_MC_ID} />
              <label htmlFor="MERGE0"></label>
              <div className="flex w-full justify-center items-center md:mt-2">
                <div className="w-1/5">
                  <input
                    type="email"
                    value={email}
                    placeholder="Email"
                    name="EMAIL"
                    className="required email text-black rounded-sm h-4 py-4 w-full px-4 mr-4 font-body"
                    id="mce-EMAIL"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div id="mce-responses" className="clear">
                  <div
                    className="response hidden"
                    id="mce-error-response"
                  ></div>
                  <div className="hidden" id="mce-success-response"></div>
                </div>
                <div
                  className="absolute"
                  style={{ left: "-5000px" }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_577d9034d2d8256b3f70f21c9_9b783b9bb9"
                    tabIndex={-1}
                    value=""
                  />
                </div>
                <div className="clear">
                  <input
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button rounded-sm cursor-pointer text-black w-full px-2 h-8 ml-4"
                    style={{ background: "#c43d34" }}
                  />
                </div>
              </div>
            </form>
          </div>
        </MainFade>
      </Popup> */}
      <Layout className={isBlur ? "blur" : ""}>
        <SEO title="Home" image={{ url, height, width }} />
        <Container>
          {/* RECENT */}
          <div>
            <h1 className="font-heading text-4xl text-center md:text-left md:text-6xl">
              Recent Articles
            </h1>
              <BigBlogCard content={sortedBlogs[0]} />
            <PostListContainer>
              {sortedBlogs.map((blog, i) => {
                if (i === 0) return "";
                return <BlogCard key={i} content={blog} fade={false} />;
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

        {/* =================REDIRECT============================== */}
        {data.strapi.redirect.show ? (
          <div className="md:px-20 md:mt-24 px-4">
            <div
              style={{
                borderLeft: "6px solid var(--primary)",
              }}
              className="w-full text-center py-8 bg-tcard rounded-md note"
            >
              {/* <h2 className="font-subheading text-3xl">Note!</h2> */}
              <ReactMarkdown
                children={data.strapi.redirect.text}
                className="px-2"
              />
            </div>
          </div>
        ) : null}

        {/* ABOUT */}
        <div className="">
          <Container className="flex flex-col items-center">
            <MainFade>
              <div className="md:w-1/5 w-1/4 md:mt-10">
                <Logo />
              </div>
              <h1 className="md:text-7xl text-3xl mt-2 font-heading text-center uppercase">
                <span className="md:text-8xl text-5xl">T</span>idings{" "}
                <span className="md:text-8xl text-5xl">M</span>edia
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
                      fontWeight: 600,
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
                    style={{ fontWeight: 600 }}
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
                    style={{ fontWeight: 600 }}
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
                    <Link to="/about/story">
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
                className="font-heading mt-20 text-5xl md:text-7xl border-b-3 border-primary"
              >
                Our Mission
              </h1>
              <div className="flex w-full md:flex-row flex-col mt-32 md:mb-40 mb-20 items-center md:justify-around">
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
                    <Img fluid={data.writingPic.fluid} />
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
            <h1 className="font-heading mt-5 md:mt-0 text-4xl text-center md:text-left md:text-6xl">
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
    </>
  );
};

interface Data {
  educationPic: {
    fluid: FluidObject;
  };
  readingTimePic: {
    fluid: FluidObject;
  };
  writingPic: {
    fluid: FluidObject;
  };
  strapi: {
    redirect: {
      show: boolean;
      text: string;
    };
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
// "/static/53badbe2e7860c4d02a38a73c0e4a39e/71b75/Write.png"
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
    writingPic: imageSharp(
      fluid: {
        src: {
          eq: "/static/53badbe2e7860c4d02a38a73c0e4a39e/71b75/Write.png"
        }
      }
    ) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
    strapi {
      redirect {
        show
        text
      }
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
