import { graphql, PageProps } from "gatsby";
import { FluidObject } from "gatsby-image";
import React, { FC, useEffect, useState } from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Img from "gatsby-image";
import SpotifyButton from "../components/SpotifyButton";
import PodcastShareButtons from "../components/PodcastShareButtons";

const Podcast: FC<PageProps<Data>> = ({ data }) => {
  const { allFeedPodcast, feedPodcastMeta } = data;

  const itemsList: string[] = [];
  allFeedPodcast.edges.forEach(({ node: { link } }) => {
    const linkArr = link.split("/");
    linkArr?.splice(4, 0, "embed");
    const embedLink = linkArr?.join("/");
    if (embedLink) itemsList.push(embedLink);
  });

  return (
    <Layout>
      <Container>
        <div className="lg:grid lg:grid-cols-2 flex flex-row w-full lg:w-3/4 lg:mx-auto">
          {/* <div className=""> */}
          <Img
            fluid={feedPodcastMeta.image.childImageSharp.fluid}
            className="rounded-lg lg:w-8/12 w-full mx-auto"
          />
          {/* </div> */}
          <div className="flex flex-col">
            <h1 className=" font-heading text-4xl">
              {feedPodcastMeta.title.toUpperCase()}
            </h1>
            <p className="mt-2 text-sm">{feedPodcastMeta.description}</p>
            <div className="w-full flex justify-center items-center mt-16">
              <SpotifyButton />
            </div>
          </div>
        </div>
        <div className="w-3/4 mt-10 mx-auto">
          <div className="ml-20">
            <h2 className="capitalize font-heading text-xl mb-2">
              Where to listen
            </h2>
            <PodcastShareButtons />
          </div>
        </div>
        <div className="w-3/4 my-10 mx-auto">
          <h2 className="text-3xl mb-10 font-heading">Latest Episode</h2>
          <iframe
            src={itemsList[0]}
            className="w-full h-auto"
            frameBorder="0"
            scrolling="no"
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-1/2 mx-auto my-20">
          {itemsList.length > 1 ? (
            <>
              <h2 className="font-heading text-3xl mb-10">All Episodes</h2>
              {itemsList.map((link, i) => {
                if (i === 0) {
                  return null;
                }
                return (
                  <iframe
                    src={link}
                    className="w-full h-auto"
                    frameBorder="0"
                    scrolling="no"
                    loading="lazy"
                  ></iframe>
                );
              })}
            </>
          ) : null}
        </div>
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
