import React from "react";
import { useTheme } from "./ThemeProvider";
import Light from "../assets/images/noimage-white.png";
import Dark from "../assets/images/noimage-black.png";

const NoImage = () => {
  const { theme } = useTheme();
  return (
    <>
      {theme ? (
        <img src={Dark} alt="No Image" />
      ) : (
        <img src={Light} alt="No Image" />
      )}
    </>
  );
};

export default NoImage;
