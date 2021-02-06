import React, { CSSProperties, FC } from "react";
import { useTheme } from "./ThemeProvider";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

const NoPersonImage = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => {
  const data: Data = useStaticQuery(graphql`
    query NoPersonImageQuery {
      imageSharp(
        fluid: {
          src: {
            eq: "/static/56e24b24fc9247c42a80b2e6d0f3a7cf/14b42/noperson.jpg"
          }
        }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `);
  return (
    <Img
      fluid={data.imageSharp.fluid}
      alt="No Image"
      className={className}
      style={style}
    />
  );
};

interface Data {
  imageSharp: {
    fluid: FluidObject;
  };
}

export default NoPersonImage;
