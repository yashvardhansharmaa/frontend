import { graphql, PageProps } from "gatsby";
import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { customRenderers } from "../templates/blog_template";
import WorkTimeSvg from "../assets/images/undraw_Work_time.svg";
import DocsSvg from "../assets/images/undraw_Reviewed_docs.svg";
import SEO from "../components/seo";

const WorkWithUs: FC<PageProps<Data>> = ({ data }) => {
  const markdown = data.strapi.workWithUs.text;
  return (
    <Layout>
      <SEO title="Work With Us" />
      <Container>
        <div className="maindiv mb-40">
          <h1 className="text-6xl font-heading text-center">Work With Us</h1>
          <h3 className="md:w-1/2 text-center mx-auto">
            Tidings is a student-led run blog. We're always open to recruiting
            more team members and expanding our community. We look forward to
            working with you!
          </h3>
          <div className="mt-40">
            <div className="md:grid md:grid-cols-2 flex flex-col">
              <div className="w-3/4 mx-auto">
                <img src={WorkTimeSvg} alt="" />
              </div>
              <div className="">
                <h2 className="font-subheading text-5xl text-center">
                  Internships
                </h2>
                <p className="text-center w-3/4 mx-auto mt-2">
                  We, at Tidings, offer internships to high school and college
                  students for a period of 12 weeks for various works such as
                  content writing, marketing, and graphic designing. A
                  certificate, letter of recommendation, liberty to choose your
                  topics of articles, guidance in article writing, an
                  opportunity to network amongst like-minded peers, and flexible
                  deadlines are some of the reasons to work with us. ​
                  Interested applicants may fill the form below.
                </p>
                <div className="w-full flex justify-center mt-4">
                  <a href="https://docs.google.com/forms/d/1iT-Zof9AATWVZ_W-7cXZ6f29IJmW_pmtSzGzB89esyo/edit">
                    <button className="bg-primary md:py-1 py-1 px-2 md:px-6 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-md md:text-lg">
                      Apply
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 mt-40 flex flex-col">
              <div className="md:order-1 order-2">
                <h2 className="font-subheading text-5xl text-center">
                  Editorial Board
                </h2>
                <p className="text-center w-3/4 mx-auto mt-2">
                  If you're a student with excellent grammar, a good
                  understanding of either history or economics, and have
                  significant experience in writing- apply to be a part of our
                  editorial board below!
                </p>
                <div className="w-full flex justify-center mt-4">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdZAkMrkH5vITUccTdG0qrjNASPTRa94HNdr2aPTkob_ypmKA/viewform?usp=sf_link">
                    <button className="bg-primary md:py-1 py-1 px-2 md:px-6 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-md md:text-lg">
                      Apply
                    </button>
                  </a>
                </div>
              </div>
              <div className="w-3/4 md:order-2 order-1 mx-auto">
                <img src={DocsSvg} alt="" />
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 mt-40 flex flex-col">
            <div className="w-3/4 mx-auto">
              <img src={WorkTimeSvg} alt="" />
            </div>
            <div className="">
              <h2 className="font-subheading text-5xl text-center">
                Submit a One Time Article
              </h2>
              <p className="text-center w-3/4 mx-auto mt-2">
                If you know a lot about some topic, but cannot devote time to
                our internship program, you may submit your article to be
                published!
              </p>
              <div className="w-full flex justify-center mt-4">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSffukPpV1qvI3QpJ9oJGYFZH6TcZWpu4Dzfh1g9zEWaW1tD-Q/viewform?usp=sf_link">
                  <button className="bg-primary md:py-1 py-1 px-2 md:px-6 text-bgc border-0 focus:outline-none hover:opacity-75 rounded text-md md:text-lg">
                    Apply
                  </button>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="md:px-20 lg:px-48 mx-auto">
            <div className="text-lg leading-relaxed font-body">
              <ReactMarkdown
                children={markdown}
                className="blog"
                renderers={customRenderers}
              />
            </div>
          </div> */}
        </div>
      </Container>
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
