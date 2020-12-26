import React, { CSSProperties } from "react";
import { useTheme } from "./ThemeProvider";
import Light from "../assets/images/noimage-white.png";
import Dark from "../assets/images/noimage-black.png";

const NoImage = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const { theme } = useTheme();
  return (
    <>
      {theme ? (
        <img src={Dark} alt="No Image" className={className} style={style} />
      ) : (
        <img src={Light} alt="No Image" className={className} style={style} />
      )}
    </>
  );
};

export default NoImage;
