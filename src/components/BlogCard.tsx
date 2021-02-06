import React from "react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Img, { FluidObject } from "gatsby-image";
import { Link } from "gatsby";
import { BlogListDataNode } from "../templates/blog_list_template";
import RenderCategories from "./RenderCategories";
import MainFade from "./MainFade";
import { cardCustomRenderers } from "./BigBlogCard";
import NoImage from "./NoImage";

const BlogCard = ({
  content: { authors, categories, cover, published_date, title, excerpt, slug },
  fade = true,
}: {
  content: BlogListDataNode;
  fade?: boolean;
}) => (
  <div className="flex my-5 w-full md:w-3/10 flex-col">
    {fade ? (
      <MainFade>
        <Link to={`/blog/${slug}`}>
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
          <div className="text-sm mt-1">
            <RenderCategories categories={categories} />
            <span className="opacity-75">
              {format(Date.parse(published_date), "MMM d, Y")}
            </span>
          </div>
          <h1 className="text-3xl py-2 font-heading">{title}</h1>
          <p className="leading-relaxed font-body">
            <ReactMarkdown renderers={cardCustomRenderers} children={excerpt} />
          </p>
          {authors.map((author) => (
            <div className="flex mt-2">
              {author.pic ? (
                <Img
                  className="h-8 w-8 rounded-full"
                  fluid={author.pic.imageFile.childImageSharp.fluid}
                  alt={author.name}
                />
              ) : (
                <NoImage className="h-8 w-8 rounded-full" />
              )}
              <span className="mx-2 mt-1 font-semibold">{author.name}</span>
            </div>
          ))}
        </Link>
      </MainFade>
    ) : (
      <Link to={`/blog/${slug}`}>
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
        <div className="text-sm mt-1">
          <RenderCategories categories={categories} />
          <span className="opacity-75">
            {format(Date.parse(published_date), "MMM d, Y")}
          </span>
        </div>
        <h1 className="text-3xl py-2 font-heading">{title}</h1>
        <p className="leading-relaxed font-body">
          <ReactMarkdown renderers={cardCustomRenderers} children={excerpt} />
        </p>
        {authors.map((author) => (
          <div className="flex mt-2">
            {author.pic ? (
              <Img
                className="h-8 w-8 rounded-full"
                fluid={author.pic.imageFile.childImageSharp.fluid}
                alt={author.name}
              />
            ) : (
              <NoImage className="h-8 w-8 rounded-full" />
            )}
            <span className="mx-2 mt-1 font-semibold">{author.name}</span>
          </div>
        ))}
      </Link>
    )}
  </div>
);

export default BlogCard;
