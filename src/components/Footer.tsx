import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import logo from "../assets/logo.png";

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
    };
  };
}

const Footer = () => {
  const data: FooterData = useStaticQuery(graphql`
    query Footer {
      strapi {
        footerItems {
          heading
          sub_item {
            link
            name
          }
        }
        footer {
          company
          description
          facebook_link
          instagram_link
          linkedin_link
        }
      }
    }
  `);

  // const footerItems = data.allStrapiFooterItem.edges;
  // const { company, description } = data.allStrapiFooter.edges[0].node;
  // const footer = data.allStrapiFooter.edges[0].node;
  const {
    footer: {
      company,
      description,
      facebook_link,
      instagram_link,
      linkedin_link,
    },
    footerItems,
  } = data.strapi;

  const FooterItems = () => (
    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      {/* {console.log(data.allStrapiFooter)} */}
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

  return (
    <footer className="text-white body-font bg-fg2 shadow-1dp">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center">
            <img src={logo} style={{ height: "25px", width: "25px" }} alt="" />
            <span className="ml-3 text-xl">{company}</span>
          </a>
          <p className="mt-2 text-sm">{description}</p>
        </div>
        {FooterItems()}
      </div>
      <div className="bg-fg1 shadow-2dp">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} tidingsmedia
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
            {/* <a className="ml-3 text-gray-500">
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
            </a> */}
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
