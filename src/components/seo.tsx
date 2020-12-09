import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({ title, description, image, blog }: SeoProps) => {
  const { pathname } = useLocation();
  const {
    site: { siteMetadata },
    strapi: { footer },
  } = useStaticQuery<gqlTypes>(query);

  // Get data
  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
  } = siteMetadata;
  // const { facebookUsername, instagramUsername, linkedinUsername } = footer;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${image ? image : defaultImage}`,
    url: `${siteUrl}${pathname}`,
    type: blog ? "blog" : "website",
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={seo.title}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          name: `description`,
          content: seo.description,
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:url`,
          content: seo.url,
        },
        {
          property: `og:type`,
          content: seo.type,
        },
        {
          property: `og:type`,
          content: seo.type,
        },
      ]}
    ></Helmet>
  );
};
export default SEO;

// SEO.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
//   image: PropTypes.string,
//   article: PropTypes.bool,
// };
// SEO.defaultProps = {
//   title: null,
//   description: null,
//   image: null,
//   article: false,
// };

interface gqlTypes {
  site: {
    siteMetadata: {
      defaultTitle: string;
      defaultDescription: string;
      siteUrl: string;
      defaultImage: string;
    };
  };
  strapi: {
    footer: {
      company: string;
      linkedinUsername: string;
      facebookUsername: string;
      instagramUsername: string;
    };
  };
}

interface SeoProps {
  title: string;
  description: string;
  image: string;
  blog: boolean;
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
        defaultImage: image
      }
    }
    strapi {
      footer {
        company
      }
    }
  }
`;
