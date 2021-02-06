import React, { CSSProperties, FC } from "react";
import { useTheme } from "./ThemeProvider";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

const NoImage = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const data: Data = useStaticQuery(graphql`
    query NoimageQuery {
      black: imageSharp(
        fluid: {
          src: {
            eq: "/static/488cf1e6ece61df5ede14be7a7ca50da/ee604/noimage-black.png"
          }
        }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
      white: imageSharp(
        fluid: {
          src: {
            eq: "/static/5d118c09315188e771ff77b2cd126e0e/ee604/noimage-white.png"
          }
        }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `);
  const { theme } = useTheme();
  return (
    <>
      {theme ? (
        <Img
          fluid={data.black.fluid}
          alt="No Image"
          className={className}
          style={style}
        />
      ) : (
        <Img
          fluid={data.white.fluid}
          alt="No Image"
          className={className}
          style={style}
        />
      )}
    </>
  );
};

interface Data {
  black: {
    fluid: FluidObject;
  };
  white: {
    fluid: FluidObject;
  };
}

export default NoImage;
