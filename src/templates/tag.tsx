import { graphql } from "gatsby";
import React from "react";
import Container from "../components/Container";
import Layout from "../components/Layout";
import PostListContainer from "../components/PostListContainer";
import { capitalize } from "../utils";
// import {} from

const Tags = ({ data }: { data: tagData }) => {
  const { name } = data.strapiTags;
  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-heading">{name}</h1>
        <PostListContainer>
          <p>hi</p>
        </PostListContainer>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query TagQuery($name: String!) {
    strapiTags(name: { eq: $name }) {
      name
    }
  }
`;

interface tagData {
  strapiTags: {
    name: string;
  };
}
export default Tags;
