import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Img, { FixedObject } from "gatsby-image";
import { useTheme } from "./ThemeProvider";
import NoImage from "./NoImage";

interface FooterData {
  strapi: {
    footerItems: {
      heading: string;
      sub_item: {
        link: string;
        name: string;
      }[];
    }[];
    footer: {
      company: string;
      description: string;
      facebook_link: string;
      instagram_link: string;
      linkedin_link: string;
      twitter_link?: string;
      logo: {
        url: string;
        imageFile: {
          childImageSharp: {
            fixed: FixedObject;
          };
        };
      };
    };
    navbar: {
      logo: {
        url: string;
        imageFile: {
          childImageSharp: {
            fixed: FixedObject;
          };
        };
      };
      logo_black: {
        url: string;
        imageFile: {
          childImageSharp: {
            fixed: FixedObject;
          };
        };
      };
    };
  };
}

const Footer = () => {
  const data = useStaticQuery<FooterData>(graphql`
    query Footer {
      strapi {
        footer {
          company
          description
          facebook_link
          instagram_link
          linkedin_link
          twitter_link
          logo {
            url
            imageFile {
              childImageSharp {
                fixed(width: 25, height: 25) {
                  aspectRatio
                  base64
                  src
                  srcSet
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);

  const {
    footer: {
      company,
      description,
      facebook_link,
      instagram_link,
      linkedin_link,
      twitter_link,
      logo,
    },
    footerItems,
  } = data.strapi;

  const FooterItems = () => (
    <div className="flex flex-wrap md:pl-20 -mb-10 mr-5 md:mt-0 mt-10 md:text-left text-center">
      {footerItems.map((item, i: number) => {
        const { heading, sub_item } = item;
        return (
          <div key={i} className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium tracking-widest text-sm mb-3">
              {heading}
            </h2>
            <nav className="list-none mb-10">
              {sub_item.map((footerSubItem, i2: number) => (
                <li key={i2}>
                  <a href={footerSubItem.link} className="">
                    {footerSubItem.name}
                  </a>
                </li>
              ))}
            </nav>
          </div>
        );
      })}
    </div>
  );

  const { theme } = useTheme();

  const [email, setEmail] = useState("");

  return (
    <footer className="text-white body-font relative z-100 bg-ft2 shadow-1dp">
      <div className="container px-5 py-10 md:py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            to="/"
            className="flex title-font font-medium items-center md:justify-start justify-center"
          >
            {logo.imageFile ? (
              <Img fixed={logo.imageFile.childImageSharp.fixed} />
            ) : (
              <NoImage style={{ height: "25px", width: "25px" }} />
            )}
            <span className="ml-3 text-xl">{company}</span>
          </Link>
          <p className="mt-2 text-sm">{description}</p>
        </div>
        {/* {FooterItems()} */}
        <form
          action="https://thetidingsblog.us10.list-manage.com/subscribe/post"
          method="POST"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate w-100 mx-auto md:mt-0 mt-10"
          target="_blank"
          noValidate
        >
          <input type="hidden" name="u" value={process.env.GATSBY_MC_U} />
          <input type="hidden" name="id" value={process.env.GATSBY_MC_ID} />
          <label htmlFor="MERGE0"></label>
          <div id="mc_embed_signup_scroll">
            <h2 className="font-subheading text-center capitalize text-3xl">
              Subscribe to our newsletter
            </h2>
            <p
              className="text-center mt-2 mb-4 w-3/4 mx-auto"
              style={{ opacity: 0.9 }}
            >
              Receive exclusive resources to become a better writer, economist,
              and historian!
            </p>
            <div className="flex flex-col w-3/4 mx-auto justify-between mt-2">
              <div className="mc-field-group">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  name="EMAIL"
                  className="required email text-black rounded-sm h-4 w-full py-4 px-2"
                  id="mce-EMAIL"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="mce-responses" className="clear">
                <div className="response hidden" id="mce-error-response"></div>
                <div className="hidden" id="mce-success-response"></div>
              </div>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <div
                className="absolute"
                style={{ left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_577d9034d2d8256b3f70f21c9_9b783b9bb9"
                  tabIndex={-1}
                  value=""
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button rounded-sm cursor-pointer text-black w-full mt-4 h-8"
                  style={{ background: "#c43d34" }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-ft1 shadow-2dp">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} {company}
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            {/* FACEBOOK */}
            <a href={facebook_link} className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            {/* TWITTER */}
            {twitter_link ? (
              <a href={twitter_link} className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
            ) : (
              ""
            )}

            {/* INSTAGRAM */}
            <a href={instagram_link} className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            {/* LINKEDIN */}
            <a href={linkedin_link} className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
