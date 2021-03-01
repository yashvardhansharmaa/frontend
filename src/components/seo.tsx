import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO = ({
  title,
  description,
  image,
  blog = false,
  authors,
  keywords,
}: SeoProps) => {
  const { pathname } = useLocation();
  const {
    site: { siteMetadata },
    strapi: { navbar },
  } = useStaticQuery<gqlTypes>(query);

  // Get data
  const { defaultTitle, defaultDescription, siteUrl } = siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${image ? image : navbar.logo.url}`,
    url: `${siteUrl}${pathname}`,
    type: blog ? "blog" : "website",
  };

  const metaTags = [
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
    {
      name: `twitter:title`,
      content: seo.title,
    },
    {
      name: `twitter:description`,
      content: seo.title,
    },
  ].concat(
    image
      ? [
          {
            property: "og:image",
            content: image.url,
          },
          {
            property: "og:image:width",
            content: image.width.toString(),
          },
          {
            property: "og:image:height",
            content: image.height.toString(),
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ]
      : [
          {
            name: "twitter:card",
            content: "summary",
          },
        ]
  );

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={seo.title}
      titleTemplate={`%s | ${defaultTitle}`}
    >
      {metaTags.map((tag) => (
        <meta name={tag.name} content={tag.content} />
      ))}
      {keywords && keywords.length && (
        <meta name="keywords" content={keywords.join(",")} />
      )}

      <meta name="description" content={seo.description} />

      {authors &&
        authors.map((author) => (
          <meta name="twitter:creator" content={author} />
        ))}
    </Helmet>
  );
};
export default SEO;

interface gqlTypes {
  site: {
    siteMetadata: {
      defaultTitle: string;
      defaultDescription: string;
      siteUrl: string;
    };
  };
  strapi: {
    navbar: {
      logo: {
        url: string;
      };
    };
  };
}

interface SeoProps {
  title?: string;
  description?: string;
  image?: {
    url: string;
    height: number;
    width: number;
  };
  blog?: boolean;
  authors?: string[];
  keywords?: string[];
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
      }
    }
    strapi {
      navbar {
        logo {
          url
        }
      }
    }
  }
`;
