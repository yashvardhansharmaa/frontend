import React from "react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Img, { FluidObject } from "gatsby-image";
import { Link } from "gatsby";
import { BlogListDataNode } from "../templates/blog_list_template";

const BlogCard = ({
  content: { author, category, cover, published_date, title, body, slug },
}: {
  content: BlogListDataNode;
}) => (
  <div className="flex my-5 border border-white w-full md:w-2/5 flex-col">
    <Link to={`/blog/${slug}`}>
      <Img
        fluid={cover.imageFile.childImageSharp.fluid}
        className="rounded-lg w-full"
        alt={title}
      />
      <div className="text-sm mt-1">
        <span className="font-semibold">{category.name} </span>|{" "}
        <span className="opacity-75">
          {format(Date.parse(published_date), "MMM d, Y")}
        </span>
      </div>
      <h1 className="text-3xl py-2 font-heading">{title}</h1>
      <p className="leading-relaxed">
        <ReactMarkdown children={body.substring(0, 140)} />
      </p>
      <div className="flex mt-2">
        <Img
          className="h-8 w-8 rounded-full"
          fixed={author.pic.imageFile.childImageSharp.fixed}
          alt={author.name}
        />
        <span className="mx-2 mt-1 font-semibold">{author.name}</span>
      </div>
    </Link>
  </div>
);

interface PostType {
  cover: FluidObject;
  category: string;
  published_date: string;
  title: string;
  body: string;
  author: {
    name: string;
    pic: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  slug: string;
}

export default BlogCard;
