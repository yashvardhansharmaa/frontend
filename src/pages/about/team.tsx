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

const OurTeam: FC<PageProps<Data>> = ({ data }) => {
  const teamMembers = data.strapi.teams;

  return (
    <Layout>
      <Container>
        <div className="md:mt-24 container px-10 mx-auto lg:px-10">
          <div className="md:w-2/4 w-3/4 mx-auto">
            <Img fluid={data.confCall.fluid} />
          </div>
          <Heading>Our Team</Heading>
          {teamMembers &&
            teamMembers.map((user) => {
              if (user.name.toLowerCase() === "yashvardhan sharma") {
                const { instagram, twitter, linkedin, email, calendly } = user;
                return (
                  <div className="flex lg:w-1/2 mx-auto flex-col md:flex-row w-full mb-20">
                    {/* IMAGE SECTION */}
                    <div className="md:w-1/3 w-1/2 mr-5 mt-2 mb-5 md:mb-0">
                      {user.pic ? (
                        <Img fluid={user.pic.imageFile.childImageSharp.fluid} />
                      ) : (
                        <NoImage className="w-full" />
                      )}
                    </div>
                    {/* TEXT SECTION */}
                    <div className="md:w-2/3 w-full">
                      <h3 className="font-heading text-2xl">{user.name}</h3>
                      <h4 className="text-xs mt-2 font-heading tracking-wider">
                        {user.position.toUpperCase()}
                      </h4>
                      <p className="mt-2 text-sm tracking-wide pr-10">
                        {user.description}
                      </p>
                      <div className="flex mt-2">
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
                  <div className="flex lg:w-1/2 flex-col md:flex-row w-full mb-20">
                    {/* IMAGE SECTION */}
                    <div className="md:w-1/3 w-1/2 mr-5 mt-2 mb-5 md:mb-0">
                      {user.pic ? (
                        <Img fluid={user.pic.imageFile.childImageSharp.fluid} />
                      ) : (
                        <NoImage className="w-full" />
                      )}
                    </div>
                    {/* TEXT SECTION */}
                    <div className="md:w-2/3 w-full">
                      <h3 className="font-heading text-2xl">{user.name}</h3>
                      <h4 className="text-xs mt-2 font-heading tracking-wider">
                        {user.position.toUpperCase()}
                      </h4>
                      <p className="mt-2 text-sm tracking-wide pr-10">
                        {user.description}
                      </p>
                      <div className="flex mt-2">
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
      </Container>
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
