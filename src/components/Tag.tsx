import { Link } from "gatsby";
import React from "react";
import { capitalize } from "../utils";

const Tag = ({ tagName }: { tagName: string }) => {
  return (
    <Link to={`/tag/${tagName}`}>
      <span
        style={{ paddingTop: "1px", paddingBottom: "1px" }}
        className="px-2 bg-gray-300 rounded-lg"
      >
        {capitalize(tagName)}
      </span>
    </Link>
  );
};

export default Tag;
