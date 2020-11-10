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
  const postsPerPage = 1;
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

// https://github.com/strapi/gatsby-source-strapi/issues/127#issuecomment-631442189
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions;
  createResolvers({
    strapi_UploadFile: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: `${source.url}`,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  });
};
