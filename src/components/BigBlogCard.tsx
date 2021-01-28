import { format } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogListDataNode } from "../templates/blog_list_template";
import RenderCategories from "./RenderCategories";
import Img from "gatsby-image";
import { Link } from "gatsby";
import NoImage from "./NoImage";

export const cardCustomRenderers = {
  image: () => null,
};

const BigBlogCard = ({
  content: { authors, categories, cover, published_date, title, excerpt, slug },
}: {
  content: BlogListDataNode;
}) => (
  <Link to={`/blog/${slug}`}>
    <div className="md:grid my-5 flex flex-col md:grid-cols-1/2">
      <div className="overflow-hidden rounded-lg">
        {cover ? (
          <Img
            fluid={cover.imageFile.childImageSharp.fluid}
            className="w-full bloghover"
            alt={title}
          />
        ) : (
          <NoImage className="w-full bloghover" />
        )}
      </div>
      <div className="md:px-5 py-2 flex flex-col">
        <div className="">
          <div className="text-sm">
            <RenderCategories categories={categories} />

            <span className="opacity-75">
              {format(Date.parse(published_date), "MMM d, Y")}{" "}
            </span>
          </div>
          <h1 className="text-4xl py-2 font-heading">{title}</h1>
          <p className="leading-loose font-body">
            <ReactMarkdown renderers={cardCustomRenderers} children={excerpt} />
          </p>
        </div>
        <div className="mt-5">
          {authors.map((author) => (
            <div className="mt-1 md:mt-0 flex">
              {author.pic ? (
                <Img
                  className="md:h-12 md:w-12 h-8 w-8 rounded-full"
                  fluid={author.pic.imageFile.childImageSharp.fluid}
                  alt={author.name}
                />
              ) : (
                <NoImage className="md:h-12 md:w-12 h-8 w-8 rounded-full" />
              )}
              <span className="mx-2 mt-1 font-semibold">{author.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Link>
);

export default BigBlogCard;
