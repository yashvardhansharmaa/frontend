import React, { FC } from "react";
import { graphql, Link, PageProps, useStaticQuery } from "gatsby";
import Container from "../components/Container";
import { BlogListDataNode } from "../templates/blog_list_template";
import BigBlogCard from "../components/BigBlogCard";
import BlogCard from "../components/BlogCard";
import PostListContainer from "../components/PostListContainer";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import blog from "../temp/blog";
import Fade from "react-reveal/Fade";

const IndexPage: FC<PageProps> = () => {
  const data = useStaticQuery<Data>(graphql`
    query RecentQuery {
      strapi {
        home {
          company
          desciption
          people_reached
          countries_reached
          articles_published
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
            body
            published_date
            author {
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
          body
          published_date
          author {
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
  `);

  var blogs = data.strapi.blogs;
  var featuredBlogs = data.strapi.home.blogs;
  blogs = blogs.slice(2).reverse();
  const latestBlog = blogs[0];

  return (
    <Layout>
      <Container>
        {/* RECENT */}
        <div>
          <h1 className="font-heading text-5xl">Recent Articles</h1>
          <Fade duration={2500}>
            <BigBlogCard content={latestBlog} />
          </Fade>
          <PostListContainer>
            {blogs.map((blog, i) => {
              if (i === 0) return "";
              return <BlogCard key={i} content={blog} />;
            })}
          </PostListContainer>
        </div>
      </Container>

      {/* ABOUT */}
      <div className="bg-section">
        <Container className="flex flex-col items-center">
          <Fade duration={2500}>
            <Heading className="mt-10">Tidings Media</Heading>
            <p className="text-lg">
              Where we discuss economics, history, and everything in between.
            </p>
          </Fade>

          {/* STATS */}
          <div className="my-10 w-full flex justify-around">
            <div className="flex flex-col justify-end items-center">
              <p style={{ opacity: "0.6" }} className="font-heading text-6xl">
                200+
              </p>
              <p className="pb-2 uppercase text-lg">Articles Published</p>
              <div>
                <button className="py-1 px-3 text-bgc border-0 bg-gbtn focus:outline-none hover:bg-gbtnh rounded text-lg">
                  Join Us
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p style={{ opacity: "0.6" }} className="font-heading text-6xl">
                650,000+
              </p>

              <p className="pb-2 uppercase text-lg">People Reached</p>
              <div>
                <button className="bg-primary py-2 px-4 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-lg">
                  Start Reading!
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-end justify-center items-center">
              <p style={{ opacity: "0.6" }} className="font-heading text-6xl">
                150+
              </p>
              <p className="pb-2 uppercase text-lg">Countries Reached</p>
              <div>
                <button className="bg-gbtn py-1 px-3 text-bgc border-0 focus:outline-none hover:bg-gbtnh rounded text-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Featured Articles */}
      <Container>
        <h1 className="font-heading text-5xl">Featured Articles</h1>
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
    };
  };
}

export default IndexPage;
