require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Tidings Media`,
    description: `Where we discuss economics, history, and everything in between.`,
    siteUrl: "http://www.tidingsmedia.org/",
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
        url: `${process.env.STRAPI_BASEURL}/graphql`,
        // headers: {
        //   Authorization: `Bearer ${STRAPI_JWT}`,
        // },
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://anchor.fm/s/d862a10/podcast/rss`,
        name: `Podcast`,
        // Optional
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
        // parserOption: {
        //   customFields: {
        //     item: ['itunes:duration']
        //   }
        // }
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
        name: `Tidings Media`,
        short_name: `tidingsmedia`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#800000`,
        display: `minimal-ui`,
        icon: `src/assets/logo-light.png`, // This path is relative to the root of the site.
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
  ],
};
