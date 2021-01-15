import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import { customRenderers } from "../templates/blog_template";

const WorkWithUs: FC<PageProps<Data>> = ({ data }) => {
  const markdown = data.strapi.workWithUs.text;
  return (
    <Layout>
      <div className="maindiv mb-20">
        <h1 className="text-6xl font-heading text-center">Our Work</h1>
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

export interface WorkWithUs {
  text: string;
}

export interface Strapi {
  workWithUs: WorkWithUs;
}

export interface Data {
  strapi: Strapi;
}

export interface RootObject {
  data: Data;
}

export const query = graphql`
  query WorkWithUsQuery {
    strapi {
      workWithUs {
        text
      }
    }
  }
`;

export default WorkWithUs;
