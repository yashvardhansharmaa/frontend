import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import Img, { FluidObject } from "gatsby-image";
import NoImage from "../components/NoImage";

const WorkWithUs: FC<PageProps<Data>> = ({ data }) => {
  const workWithUs = data.strapi.workWithUs;

  const leftImagePart = (section: Section) => {
    const { button_link, description, title, pic } = section;
    return (
      <div className="md:grid md:grid-cols-2 my-20 flex flex-col">
        <div className="w-3/4 mx-auto">
          {/* <img src={WorkTimeSvg} alt="" /> */}
          {pic.imageFile ? (
            <>
              {pic.ext.includes("svg") ? (
                <img src={pic.imageFile.publicURL} alt="" />
              ) : (
                <Img fluid={pic.imageFile.childImageSharp.fluid} />
              )}
            </>
          ) : (
            <NoImage />
          )}
        </div>
        <div className="">
          <h2 className="font-subheading text-5xl text-center">{title}</h2>
          <p className="text-center w-3/4 mx-auto mt-2">{description}</p>
          <div className="w-full flex justify-center mt-4">
            <a href={button_link}>
              <button className="bg-primary md:py-1 py-1 px-2 md:px-6 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-md md:text-lg">
                Apply
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  };

  const rightImagePart = (section: Section) => {
    const { button_link, description, title, pic } = section;

    return (
      <div className="md:grid md:grid-cols-2 my-20 flex flex-col">
        <div className="md:order-1 order-2">
          <h2 className="font-subheading text-5xl text-center">{title}</h2>
          <p className="text-center w-3/4 mx-auto mt-2">{description}</p>
          <div className="w-full flex justify-center mt-4">
            <a href={button_link}>
              <button className="bg-primary md:py-1 py-1 px-2 md:px-6 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-md md:text-lg">
                Apply
              </button>
            </a>
          </div>
        </div>
        <div className="w-3/4 md:order-2 order-1 mx-auto">
          {pic.imageFile ? (
            <>
              {pic.ext.includes("svg") ? (
                <img src={pic.imageFile.publicURL} alt="" />
              ) : (
                <Img fluid={pic.imageFile.childImageSharp.fluid} />
              )}
            </>
          ) : (
            <NoImage />
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <SEO title="Work With Us" />
      <Container>
        <div className="maindiv mb-40">
          <h1 className="text-6xl font-heading text-center">Work With Us</h1>
          <h3 className="md:w-1/2 text-center mx-auto mb-20">
            Tidings is a student-led run blog. We're always open to recruiting
            more team members and expanding our community. We look forward to
            working with you!
          </h3>
          <div className="mt-40">
            {workWithUs.section.map((section) => (
              <>
                {!section.is_image_right ? (
                  <>{leftImagePart(section)}</>
                ) : (
                  <>{rightImagePart(section)}</>
                )}
              </>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export interface Strapi {
  workWithUs: WorkWithUs;
}

export interface Data {
  strapi: Strapi;
}

export interface RootObject {
  data: Data;
}

export interface Section {
  button_link: string;
  description: string;
  id: string;
  is_image_right: boolean;
  title: string;
  pic: {
    url: string;
    ext: string;
    imageFile: {
      childImageSharp: {
        fluid: FluidObject;
      };
      publicURL: string;
    };
  };
}

export interface WorkWithUs {
  section: Section[];
  mainDescription: string;
}

export const query = graphql`
  query workwithusquery {
    strapi {
      workWithUs {
        section {
          button_link
          description
          id
          is_image_right
          title
          pic {
            url
            ext
            imageFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
              publicURL
            }
          }
        }
        mainDescription
      }
    }
  }
`;

export default WorkWithUs;
