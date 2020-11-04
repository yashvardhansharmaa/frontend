/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
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
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

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

// exports.createResolvers = ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   createRemoteFileNode,
//   store,
//   reporter,
// }) => {
//   const { createNode } = actions;
//   createResolvers({
//     StrapiBlogsAuthorPic: {
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
