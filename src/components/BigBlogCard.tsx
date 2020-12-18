import { format } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import { BlogListDataNode } from "../templates/blog_list_template";
import { capitalize } from "../utils";
import Img from "gatsby-image";
import { Link } from "gatsby";
import NoImage from "./NoImage";

export const cardCustomRenderers = {
  image: () => null,
};

const BigBlogCard = ({
  content: { author, category, cover, published_date, title, excerpt, slug },
}: {
  content: BlogListDataNode;
}) => (
  <Link to={`/blog/${slug}`}>
    <div className="md:grid my-5 flex flex-col md:grid-cols-2">
      <div className="overflow-hidden rounded-lg">
        {cover.imageFile ? (
          <Img
            fluid={cover.imageFile.childImageSharp.fluid}
            className="w-full bloghover"
            alt={title}
          />
        ) : (
          <NoImage />
        )}
      </div>
      <div className="md:px-5 py-2 flex flex-col justify-between">
        <div className="">
          <div className="text-sm">
            <span className="font-semibold">{capitalize(category.name)} </span>|{" "}
            <span className="opacity-75">
              {" "}
              {format(Date.parse(published_date), "MMM d, Y")}{" "}
            </span>
          </div>
          <h1 className="text-4xl py-2 font-heading">{title}</h1>
          <p className="leading-loose">
            <ReactMarkdown renderers={cardCustomRenderers} children={excerpt} />
          </p>
        </div>
        <div className="mt-1 md:mt-0 flex">
          {author.pic.imageFile ? (
            <Img
              className="md:h-12 md:w-12 h-8 w-8 rounded-full"
              fluid={author.pic.imageFile.childImageSharp.fluid}
              alt={author.name}
            />
          ) : (
            <NoImage />
          )}

          <span className="mx-2 mt-1 font-semibold">{author.name}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default BigBlogCard;
