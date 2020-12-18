import React from "react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Img, { FluidObject } from "gatsby-image";
import { Link } from "gatsby";
import { BlogListDataNode } from "../templates/blog_list_template";
import { capitalize } from "../utils";
import MainFade from "./MainFade";
import { cardCustomRenderers } from "./BigBlogCard";
import NoImage from "./NoImage";

const BlogCard = ({
  content: { author, category, cover, published_date, title, excerpt, slug },
}: {
  content: BlogListDataNode;
}) => (
  <div className="flex my-5 w-full md:w-3/10 flex-col">
    <MainFade>
      <Link to={`/blog/${slug}`}>
        <div className="overflow-hidden rounded-lg">
          <Img
            fluid={cover.imageFile.childImageSharp.fluid}
            className="w-full bloghover"
            alt={title}
          />
        </div>
        <div className="text-sm mt-1">
          <span className="font-semibold">{capitalize(category.name)} </span>|{" "}
          <span className="opacity-75">
            {format(Date.parse(published_date), "MMM d, Y")}
          </span>
        </div>
        <h1 className="text-3xl py-2 font-heading">{title}</h1>
        <p className="leading-relaxed">
          <ReactMarkdown renderers={cardCustomRenderers} children={excerpt} />
        </p>
        <div className="flex mt-2">
          {author.pic.imageFile ? (
            <Img
              className="h-8 w-8 rounded-full"
              fluid={author.pic.imageFile.childImageSharp.fluid}
              alt={author.name}
            />
          ) : (
            <NoImage />
          )}
          <span className="mx-2 mt-1 font-semibold">{author.name}</span>
        </div>
      </Link>
    </MainFade>
  </div>
);

export default BlogCard;
