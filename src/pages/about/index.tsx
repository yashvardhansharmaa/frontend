import { graphql, PageProps } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { customRenderers } from "../../templates/blog_template";

const AboutUs: FC<PageProps<Data>> = ({ data }) => {
  return (
    <Layout>
      <div className="mt-24 container mx-auto px-4 md:px-8">
        <div className="maindiv mb-20">
          <div className="md:w-1/4 w-3/4 mx-auto">
            {/* <Img fluid={data.publishArticlePic.fluid} /> */}
          </div>
          <h1 className="text-6xl font-heading text-center">About us</h1>
          <div className="container md:px-20 lg:px-48 mx-auto"></div>
        </div>
      </div>
    </Layout>
  );
};

interface Data {
  publishArticlePic: {
    fluid: FluidObject;
  };
  strapi: {
    about: {
      our_story: string;
    };
  };
}

// export const query = graphql`
//   query StoryQuery {
//     publishArticlePic: imageSharp(
//       fluid: {
//         src: {
//           eq: "/static/b4585f0e39a259d0ab8f2fbdc9b8c5aa/ee604/undraw_publish_article_icso.png"
//         }
//       }
//     ) {
//       fluid {
//         ...GatsbyImageSharpFluid
//       }
//     }
//     strapi {
//       about {
//         our_story
//       }
//     }
//   }
// `;

export default AboutUs;
