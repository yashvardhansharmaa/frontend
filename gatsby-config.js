require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { STRAPI_BASEURL, STRAPI_JWT } = process.env;

module.exports = {
  siteMetadata: {
    title: `Tidings Media`,
    description: `Where we discuss economics, history, and everything in between.`,
    // author: ``,
    siteUrl: "http://localhost:8000",
    image:
      "https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=844&q=80",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src`,
      },
    },
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "strapi",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "strapi",
        // Url to query from
        url: `${STRAPI_BASEURL}/graphql`,
        headers: {
          Authorization: `Bearer ${STRAPI_JWT}`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                defaultTitle: title
                description
                siteUrl
                defaultImage: image
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, strapi } }) => {
              return strapi.blogs.map((blog) => {
                return Object.assign(
                  {},
                  {
                    description: blog.excerpt,
                    date: blog.published_date,
                    url: `${site.siteMetadata.siteUrl}/blog/${blog.slug}`,
                    custom_elements: [{ "content:encoded": blog.body }],
                  }
                );
              });
            },
            query: `
              {
                strapi {
                  blogs(sort: "published_date") {
                    slug
                    excerpt
                    title
                    body
                    published_date
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-dark-mode`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-advanced-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [``, `/blog`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: [{ regex: "^/blog" }],
        excludePaths: [
          "/blog/",
          "/blog",
          { regex: "/blog/[0-9]" },
          { regex: "/blog/[0-9]/" },
        ],
        height: 3,
        prependToBody: false,
        color: `var(--primary)`,
        footerHeight: 500,
      },
    },
    // {
    //   resolve: `gatsby-transformer-remark`,
    //   options: {
    //     plugins: [
    //       {
    //         resolve: `gatsby-remark-images`,
    //         options: {
    //           // It's important to specify the maxWidth (in pixels) of
    //           // the content container as this plugin uses this as the
    //           // base for generating different widths of each image.
    //           maxWidth: 1300,
    //         },
    //       },
    //     ],
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
