exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        blogs: strapi {
          blogs(where: { status: "published" }, sort: "publsihed_date") {
            slug
            id
          }
        }

        tags: strapi {
          tags {
            name
            id
          }
        }

        authors: strapi {
          authors {
            id
            name
          }
        }

        categories: strapi {
          categories {
            name
            id
            blogs {
              id
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
  const blogs = result.data.blogs.blogs.reverse();
  const BlogTemplate = require.resolve("./src/templates/blog_template.tsx");
  blogs.forEach((blog, index) => {
    createPage({
      path: `/blog/${blog.slug}`,
      component: BlogTemplate,
      context: {
        id: blog.id,
      },
    });
  });

  // Create blog-list pages
  const BlogListTemplate = require.resolve(
    "./src/templates/blog_list_template.tsx"
  );
  const postsPerPage = 1;
  const numPages = Math.ceil(blogs.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    let start = blogs.length - (i + 1) * postsPerPage;
    start = start >= 0 ? start : 0;
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: BlogListTemplate,
      context: {
        limit: postsPerPage,
        start,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // Create pages for tags
  const tags = result.data.tags.tags;
  const TagTemplate = require.resolve("./src/templates/tag.tsx");
  tags.forEach((tag, index) => {
    createPage({
      path: `/tag/${tag.name}`,
      component: TagTemplate,
      context: {
        id: tag.id,
      },
    });
  });

  // Create pages for author
  const authors = result.data.authors.authors;
  const AuthorTemplate = require.resolve("./src/templates/author.tsx");
  authors.forEach((author, index) => {
    createPage({
      path: `/author/${author.name.toLowerCase()}`,
      component: AuthorTemplate,
      context: {
        id: author.id,
      },
    });
  });

  // Create pages for category
  const categories = result.data.categories.categories;
  const CategoryTemplate = require.resolve("./src/templates/category.tsx");
  categories.forEach((category, index) => {
    const { name, blogs: categoryBlogs, id } = category;
    Array.from({ length: categoryBlogs.length }).forEach((_, i) => {
      let start = categoryBlogs.length - (i + 1) * postsPerPage;
      start = start >= 0 ? start : 0;
      createPage({
        path: i === 0 ? `/${name}` : `/${name}/${i + 1}`,
        component: CategoryTemplate,
        context: {
          id,
          start,
          limit: postsPerPage,
          numPages: Math.ceil(categoryBlogs.length / postsPerPage),
          currentPage: i + 1,
        },
      });
    });
  });
};

exports.onCreateNode = async ({ node, actions, createNodeId }) => {
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
          {
            test: /slick/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
