import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { graphql, Link, useStaticQuery } from "gatsby";
import { BlogListDataNode } from "../templates/blog_list_template";
import Img from "gatsby-image";

const ImageSlider = ({
  shouldRender,
  className,
}: {
  shouldRender: boolean;
  className?: string;
}) => {
  const data = useStaticQuery<SliderData>(graphql`
    query MyQuery {
      strapi {
        blogs(limit: 6) {
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

  const blogs = data.strapi.blogs;

  return (
    <div className={`${className} px-5 md:px-0 pb-20 container mx-auto`}>
      <h1 className="font-heading md:text-6xl mb-2 text-4xl text-center">
        Our Latest Articles
      </h1>
      {!shouldRender ? (
        ""
      ) : (
        <Splide
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: false,
            pauseOnHover: false,
            resetProgress: false,
            arrows: "slider",
            perPage: 3,
            drag: true,
            rewind: false,
            breakpoints: {
              768: {
                perPage: 2,
              },
            },
          }}
        >
          {blogs.reverse().map((blog, i) => {
            return (
              <SplideSlide>
                <Link to={`/blog/${blog.slug}`}>
                  <Img fluid={blog.cover.imageFile.childImageSharp.fluid} />
                  <h3 className="font-bold text-lg">{blog.title}</h3>
                  <p className="text-xs py-1">{blog.body.slice(0, 100)}...</p>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      )}
    </div>
  );
};

interface SliderData {
  strapi: {
    blogs: BlogListDataNode[];
  };
}

export default ImageSlider;
