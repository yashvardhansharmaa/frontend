import { graphql, PageProps } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React, { FC } from "react";
import Layout from "../../components/Layout";
import NoImage from "../../components/NoImage";
import SEO from "../../components/seo";

const OurPartners: FC<PageProps<Data>> = ({ data }) => {
  const partners = data.strapi.partners;

  partners.sort((a, b) => {
    if (!a.order || !b.order) {
      return 0;
    }
    return a.order - b.order;
  });
  return (
    <Layout>
      <SEO title="Our Partners" />
      <div className="mt-24 container mx-auto px-2 md:px-20 lg:px-10">
        <h1 className="md:text-7xl text-5xl font-heading text-center">
          Our Partners
        </h1>
        <div className="mt-20 flex flex-col">
          {partners.map((partner) => {
            const { description, name, pic } = partner;
            return (
              <div className="w-full flex mb-10">
                <div className="w-1/3 mt-2">
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
                  <h3 className="font-heading text-3xl">
                    <a href={partner.link}>{name}</a>
                  </h3>
                  <p className="mt-2 text-md tracking-wide pr-10">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const partnersQuery = graphql`
  query PartnersQuery {
    strapi {
      partners {
        link
        description
        order
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
  order?: number;
  name: string;
  pic?: Pic;
  link: string;
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
