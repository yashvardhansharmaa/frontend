exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        blogs: allStrapiBlogs {
          edges {
            node {
              id
              slug
            }
          }
        }

        blogList: allStrapiBlogs(
          filter: { status: { eq: "published" } }
          sort: { fields: published_date, order: DESC }
        ) {
          edges {
            node {
              slug
            }
          }
        }

        tags: allStrapiTags {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create page for each blog
  const blogs = result.data.blogs.edges;
  const BlogTemplate = require.resolve("./src/templates/blog_template.tsx");
  blogs.forEach((blog, index) => {
    createPage({
      path: `/blog/${blog.node.slug}`,
      component: BlogTemplate,
      context: {
        slug: blog.node.slug,
      },
    });
  });

  // Create blog-list pages
  const posts = result.data.blogList.edges;
  const BlogListTemplate = require.resolve(
    "./src/templates/blog_list_template.tsx"
  );
  const postsPerPage = 2;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: BlogListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create pages for tags
  const tags = result.data.tags.edges;
  const TagTemplate = require.resolve("./src/templates/tag.tsx");
  tags.forEach((tag, index) => {
    createPage({
      path: `/tag/${tag.node.name}`,
      component: TagTemplate,
      context: {
        name: tag.node.name,
      },
    });
  });
};

module.exports.onCreateNode = async ({ node, actions, createNodeId }) => {
  const crypto = require(`crypto`);

  if (node.internal.type === "StrapiBlog") {
    const newNode = {
      id: createNodeId(`StrapiBlogContent-${node.id}`),
      parent: node.id,
      children: [],
      internal: {
        content: node.content || " ",
        type: "StrapiBlogContent",
        mediaType: "text/markdown",
        contentDigest: crypto
          .createHash("md5")
          .update(node.content || " ")
          .digest("hex"),
      },
    };
    actions.createNode(newNode);
    actions.createParentChildLink({
      parent: node,
      child: newNode,
    });
  }
};

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

// exports.createResolvers = ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   store,
//   reporter,
// }) => {
//   const { createNode } = actions;
//   createResolvers({
//     StrapiTagsBlogsAuthorPic: {
//       imageFile: {
//         type: `File`,
//         resolve(source, args, context, info) {
//           return createRemoteFileNode({
//             url: `${source.url}`, // for S3 upload. For local: `http://localhost:1337${source.url}`,
//             store,
//             cache,
//             createNode,
//             createNodeId,
//             reporter,
//           });
//         },
//       },
//     },
//   });
// };

// https://github.com/strapi/gatsby-source-strapi/issues/98#issuecomment-696518882
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type StrapiTagsBlogsAuthor implements Node {
      pic: File
    }
  `;
  createTypes(typeDefs);
};

// debug splide window undefined
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /splide/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
