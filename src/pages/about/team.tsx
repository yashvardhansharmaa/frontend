import React, { FC } from "react";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import { graphql, PageProps } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import NoImage from "../../components/NoImage";
import Instagram from "../../components/Instagram";
import Linkedin from "../../components/Linkedin";
import Twitter from "../../components/Twitter";
import Mail from "../../components/Mail";
import Container from "../../components/Container";
import SEO from "../../components/seo";

const OurTeam: FC<PageProps<Data>> = ({ data }) => {
  const teamMembers = data.strapi.teams;

  return (
    <Layout>
      <SEO title="Our Team" />
      {/* <div className="mt-24 container mx-auto px-2 md:px-20 lg:px-10"> */}
      <div className="mt-24 container px-4 mx-auto lg:px-10">
        <div className="md:w-2/4 w-3/4 mx-auto">
          <Img fluid={data.confCall.fluid} />
        </div>
        <h1 className="md:text-7xl text-5xl font-heading text-center">
          Our Team
        </h1>
        {teamMembers &&
          teamMembers.map((user) => {
            if (user.name.toLowerCase() === "yashvardhan sharma") {
              const { instagram, twitter, linkedin, email, calendly } = user;
              return (
                <div className="flex lg:w-1/2 mx-auto justify-center items-center flex-col md:flex-row w-full mb-20">
                  {/* IMAGE SECTION */}
                  <div className="md:w-1/3 w-1/2 mr-5 mt-2 mb-5 md:mb-0">
                    {user.pic ? (
                      <Img fluid={user.pic.imageFile.childImageSharp.fluid} />
                    ) : (
                      <NoImage className="w-full" />
                    )}
                  </div>
                  {/* TEXT SECTION */}
                  <div className="md:w-2/3 w-full text-justify">
                    <h3 className="font-heading md:text-left text-center text-2xl">
                      {user.name}
                    </h3>
                    <h4 className="text-xs mt-2 font-heading tracking-wider md:text-left text-center">
                      {user.position.toUpperCase()}
                    </h4>
                    <p className="mt-2 text-sm tracking-wide md:pr-10">
                      {user.description}
                    </p>
                    <div className="flex mt-4 justify-center">
                      {instagram && <Instagram link={instagram} />}
                      {linkedin && <Linkedin link={linkedin} />}
                      {twitter && <Twitter link={twitter} />}
                      {email && <Mail link={email} />}
                      {calendly && (
                        <a
                          href={calendly}
                          className="leading-none hover:underline ml-2"
                        >
                          Calendly
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        <div className="mt-10 w-full flex flex-wrap justify-between">
          {teamMembers &&
            teamMembers.map((user) => {
              const { instagram, twitter, linkedin, email } = user;
              if (user.name.toLowerCase() === "yashvardhan sharma") {
                return null;
              }
              return (
                <div className="flex lg:w-1/2 flex-col items-center md:flex-row w-full mb-20">
                  {/* IMAGE SECTION */}
                  <div className="md:w-1/3 w-1/2 mr-5 mt-2 mb-5 md:mb-0">
                    {user.pic ? (
                      <Img fluid={user.pic.imageFile.childImageSharp.fluid} />
                    ) : (
                      <NoImage className="w-full" />
                    )}
                  </div>
                  {/* TEXT SECTION */}
                  <div className="md:w-2/3 w-full md:text-left text-justify">
                    <h3 className="font-heading text-2xl md:text-left text-center">
                      {user.name}
                    </h3>
                    <h4 className="text-xs mt-2 font-heading tracking-wider md:text-left text-center">
                      {user.position.toUpperCase()}
                    </h4>
                    <p className="mt-2 text-sm tracking-wide md:pr-10">
                      {user.description}
                    </p>
                    <div className="flex mt-4 md:justify-start justify-center">
                      {instagram && <Instagram link={instagram} />}
                      {linkedin && <Linkedin link={linkedin} />}
                      {twitter && <Twitter link={twitter} />}
                      {email && <Mail link={email} />}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export const teamQuery = graphql`
  query TeamQuery {
    confCall: imageSharp(
      fluid: {
        src: {
          eq: "/static/5d484f953cd3205999e3dd3e2f93066f/ee604/undraw_conference_call_b0w6.png"
        }
      }
    ) {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
    strapi {
      teams {
        description
        email
        instagram
        linkedin
        name
        calendly
        position
        twitter
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

export interface Team {
  description: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  name: string;
  position: string;
  twitter?: string;
  calendly?: string;
  pic?: {
    url: string;
    imageFile: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}

export interface Strapi {
  teams: Team[];
}

export interface Data {
  confCall: {
    fluid: FluidObject;
  };
  strapi: Strapi;
}

export interface RootObject {
  data: Data;
}

export default OurTeam;
