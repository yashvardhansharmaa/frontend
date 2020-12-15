import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import { customRenderers } from "../templates/blog_template";

const About: FC<PageProps<Data>> = ({ data }) => {
  const markdown = data.strapi.about.our_story;
  return (
    <Layout>
      <div className="maindiv mb-20">
        <h1 className="text-6xl font-heading text-center">Our Story</h1>
        <div className="container md:px-20 lg:px-48 mx-auto">
          <div className="text-lg leading-relaxed font-body">
            <ReactMarkdown
              children={markdown}
              className="blog"
              renderers={customRenderers}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface Data {
  strapi: {
    about: {
      our_story: string;
    };
  };
}

export const query = graphql`
  query StoryQuery {
    strapi {
      about {
        our_story
      }
    }
  }
`;

export default About;
