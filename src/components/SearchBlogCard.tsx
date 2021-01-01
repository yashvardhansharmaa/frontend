import React from "react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Link } from "gatsby";
import { capitalize } from "../utils";
import NoImage from "./NoImage";

const SearchBlogCard = ({
  content: { authors, categories, cover, published_date, title, body, slug },
}: {
  content: Data;
}) => (
  <div className="flex my-5 w-full md:w-2/5 flex-col">
    <Link to={`/blog/${slug}`}>
      {cover ? (
        <img src={cover} alt={title} className="rounded-lg w-full" />
      ) : (
        <NoImage className="rounded-lg w-full" />
      )}

      <div className="text-sm mt-1">
        {categories.map((category) => (
          <span className="font-semibold">{capitalize(category.name)} | </span>
        ))}{" "}
        <span className="opacity-75">
          {format(Date.parse(published_date), "MMM d, Y")}
        </span>
      </div>
      <h1 className="text-3xl py-2 font-heading">{title}</h1>
      <p className="leading-relaxed">
        <ReactMarkdown children={body.substring(0, 140)} />
      </p>
      {authors.map((author) => (
        <div className="flex mt-2">
          {author.pic ? (
            <img
              src={author.pic}
              className="h-8 w-8 rounded-full"
              alt={author.name}
            />
          ) : (
            <NoImage className="h-8 w-8 rounded-full" />
          )}

          <span className="mx-2 mt-1 font-semibold">{author.name}</span>
        </div>
      ))}
    </Link>
  </div>
);

interface Data {
  authors: {
    name: string;
    pic: string;
  }[];
  categories: { name: string }[];
  cover: string;
  published_date: string;
  title: string;
  body: string;
  slug: string;
}

export default SearchBlogCard;
