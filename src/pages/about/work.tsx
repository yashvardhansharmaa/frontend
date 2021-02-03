import { graphql, PageProps } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import NoImage from "../../components/NoImage";
import { customRenderers } from "../../templates/blog_template";

const OurWork: FC<PageProps<Data>> = ({ data }) => {
  const { mainpic, pics, textAfterPics, textBeforePics } = data.strapi.ourWork;

  const ImageComp = ({ pic, caption }: { pic: ImageFile; caption: string }) => (
    <div className="h-full md:w-full w-1/2 mx-6 flex flex-col">
      {pic ? <Img fluid={pic.childImageSharp.fluid} /> : <NoImage />}

      <span className="mx-auto">{caption}</span>
    </div>
  );

  return (
    <Layout>
      <div className="mt-24 container mx-auto px-4 md:px-8">
        <div className="maindiv mb-20 w-full">
          <div className="md:w-1/4 w-3/4 mx-auto">
            {mainpic.imageFile ? (
              <Img fluid={mainpic.imageFile.childImageSharp.fluid} />
            ) : (
              <NoImage />
            )}
          </div>
          <h1 className="text-6xl font-heading text-center">Our Work</h1>
          <div className="container md:px-20 lg:px-48 mx-auto">
            <ReactMarkdown
              children={textBeforePics}
              renderers={customRenderers}
            />
          </div>
          <div className="flex justify-center my-6 items-center md:flex-row flex-col">
            {pics.map((pic) => {
              return (
                <ImageComp caption={pic.caption} pic={pic.pic.imageFile} />
              );
            })}
          </div>
          <div className="container md:px-20 lg:px-48 mx-auto">
            <ReactMarkdown
              children={textAfterPics}
              renderers={customRenderers}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export interface Fluid {
  src: string;
}

export interface ChildImageSharp {
  fluid: FluidObject;
}

export interface ImageFile {
  childImageSharp: ChildImageSharp;
}

export interface Pic2 {
  url: string;
  imageFile: ImageFile;
}

export interface Pic {
  caption: string;
  pic: Pic2;
}

export interface Mainpic {
  url: string;
  imageFile: ImageFile;
}

export interface OurWork {
  pics: Pic[];
  mainpic: Mainpic;
  textAfterPics: string;
  textBeforePics: string;
}

export interface Strapi {
  ourWork: OurWork;
}

export interface Data {
  strapi: Strapi;
}

export interface Extensions {}

export interface RootObject {
  data: Data;
  extensions: Extensions;
}

export const query = graphql`
  query OurWork {
    strapi {
      ourWork {
        pics {
          caption
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
        mainpic {
          url
          imageFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        textAfterPics
        textBeforePics
      }
    }
  }
`;

export default OurWork;
