import { layer } from "@fortawesome/fontawesome-svg-core";
import { graphql, PageProps } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React, { FC, useEffect, useState } from "react";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import NoImage from "../../components/NoImage";

const OurPartners: FC<PageProps<Data>> = ({ data }) => {
  const partners = data.strapi.partners;
  return (
    <Layout>
      <Container>
        <Heading>Our Partners</Heading>
        <div className="mt-20 flex flex-col">
          {partners.map((partner) => {
            const { description, name, pic } = partner;
            return (
              <div className="w-full flex mb-10">
                <div className="w-1/3 mt-2">
                  {/* <img src={user.avatar} alt="" className="w-2/3 mx-auto" /> */}
                  {pic ? (
                    <Img
                      fluid={pic.imageFile.childImageSharp.fluid}
                      className="w-2/3 mx-auto"
                    />
                  ) : (
                    <NoImage className="w-2/3 mx-auto" />
                  )}
                </div>
                <div className="w-2/3">
                  <h3 className="font-heading text-3xl">{name}</h3>
                  <p className="mt-2 text-md tracking-wide pr-10">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
};

export const partnersQuery = graphql`
  query PartnersQuery {
    strapi {
      partners {
        description
        name
        pic {
          url
          imageFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

export interface ImageFile {
  childImageSharp: {
    fluid: FluidObject;
  };
}

export interface Pic {
  url: string;
  imageFile: ImageFile;
}

export interface Partner {
  description: string;
  name: string;
  pic?: Pic;
}

export interface Strapi {
  partners: Partner[];
}

export interface Data {
  strapi: Strapi;
}
export interface RootObject {
  data: Data;
}

export default OurPartners;
