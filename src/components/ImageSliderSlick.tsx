import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { graphql, Link, useStaticQuery } from "gatsby";
import { BlogListDataNode } from "../templates/blog_list_template";
import Img from "gatsby-image";
import Slider, { ResponsiveObject } from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "../assets/slick/slick.css";
import "../assets/slick/slick-theme.css";
import ReactMarkdown from "react-markdown";

const ImageSliderSlick = ({
  shouldRender,
  className,
}: {
  shouldRender: boolean;
  className?: string;
}) => {
  const data = useStaticQuery<SliderData>(graphql`
    query SlickQuery {
      strapi {
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
  blogs.length = 6;

  const responsiveSettings: ResponsiveObject[] = [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ];

  return (
    <div className={`${className} px-5 md:px-0 pb-20 container mx-auto`}>
      <h1 className="font-heading md:text-6xl mb-2 text-4xl text-center">
        Our Latest Articles
      </h1>
      {!shouldRender ? (
        ""
      ) : (
        <Slider
          dots={true}
          draggable={true}
          infinite={true}
          responsive={responsiveSettings}
          slidesToShow={3}
          slidesPerRow={1}
          centerMode={true}
          centerPadding="60px"
        >
          {blogs.reverse().map((blog, i) => {
            return (
              <div key={i} className="md:px-5 px-2">
                <Link className="" to={`/blog/${blog.slug}`}>
                  <Img fluid={blog.cover.imageFile.childImageSharp.fluid} />
                  <h3 className="font-bold text-lg">{blog.title}</h3>
                  <p className="text-xs py-1">
                    <ReactMarkdown children={`${blog.body.slice(0, 100)}...`} />
                  </p>
                </Link>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

interface SliderData {
  strapi: {
    blogs: BlogListDataNode[];
  };
}

export default ImageSliderSlick;
