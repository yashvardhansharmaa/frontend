import { graphql, PageProps } from "gatsby";
import { FluidObject } from "gatsby-image";
import React, { FC, useEffect, useState } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Img from "gatsby-image";

const Podcast: FC<PageProps<Data>> = ({ data }) => {
  const itemsList: string[] = [];
  data.allFeedPodcast.edges.forEach(({ node: { link } }) => {
    const linkArr = link.split("/");
    linkArr?.splice(4, 0, "embed");
    const embedLink = linkArr?.join("/");
    if (embedLink) itemsList.push(embedLink);
  });

  const { allFeedPodcast, feedPodcastMeta } = data;

  return (
    <Layout>
      <Container>
        <div className="grid grid-cols-2 w-3/4 mx-auto">
          <div className="">
            {/* <img
              src={feedPodcastMeta.image.url}
              className="rounded-lg w-8/12 mx-auto "
              alt=""
            /> */}
            <Img
              fluid={feedPodcastMeta.image.childImageSharp.fluid}
              className="rounded-lg w-8/12 mx-auto"
            />
          </div>
          <div className="flex flex-col">
            <h1 className=" font-heading text-4xl">
              {feedPodcastMeta.title.toUpperCase()}
            </h1>
            <p className="mt-2 text-sm">{feedPodcastMeta.description}</p>
          </div>
        </div>
        <div className="w-3/4 mx-auto">
          <iframe
            src={itemsList[0]}
            // height="102px"
            // width="400px"
            className="my-20 w-full h-auto"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
        </div>
        {/* {itemsList.map((link) => (
          <iframe
            src={link}
            height="102px"
            width="400px"
            className="my-20"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
        ))} */}
      </Container>
    </Layout>
  );
};

export interface Node {
  link: string;
  title: string;
  pubDate: string;
  creator: string;
  contentSnippet: string;
}

export interface Edge {
  node: Node;
}

export interface AllFeedPodcast {
  edges: Edge[];
}

export interface Image {
  url: string;
  childImageSharp: {
    fluid: FluidObject;
  };
}

export interface FeedPodcastMeta {
  image: Image;
  author: string;
  title: string;
  description: string;
}

export interface Data {
  allFeedPodcast: AllFeedPodcast;
  feedPodcastMeta: FeedPodcastMeta;
}

export interface Extensions {}

export interface RootObject {
  data: Data;
  extensions: Extensions;
}

export const podcastQuery = graphql`
  query podcastQuery {
    allFeedPodcast(sort: { fields: pubDate, order: DESC }) {
      edges {
        node {
          link
          title
          pubDate
          creator
          contentSnippet
        }
      }
    }
    feedPodcastMeta {
      image {
        url
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      title
      description
    }
  }
`;

export default Podcast;
