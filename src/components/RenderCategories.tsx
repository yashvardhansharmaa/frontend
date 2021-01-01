import React from "react";
import { capitalize } from "../utils";

const RenderCategories = ({
  categories,
}: {
  categories: { name: string }[];
}) => {
  return (
    <>
      {categories.map((category) => {
        if (category.name.toLowerCase() === "archive") {
          return null;
        }
        return (
          <span key={category.name} className="font-semibold">
            {capitalize(category.name)} |{" "}
          </span>
        );
      })}
    </>
  );
};

export default RenderCategories;
