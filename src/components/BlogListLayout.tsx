import React from "react";
import { BlogListDataNode } from "../templates/blog_list_template";
import BlogBanner from "./BlogBanner";
import BlogCard from "./BlogCard";
import Container from "./Container";
import Heading from "./Heading";
import Layout from "./Layout";
import PaginateButtons, { PaginateData } from "./PaginateButtons";
import PostListContainer from "./PostListContainer";

const BlogListLayout = ({ posts, paginateData }: BlogListLayoutData) => {
  return (
    <Layout>
      <Container>
        <Heading>Our Articles</Heading>
        <BlogBanner />
        <PostListContainer>
          {posts.map((post) => (
            <BlogCard content={post} key={post.slug} />
          ))}
        </PostListContainer>
        <div className="flex my-10 justify-center">
          <PaginateButtons data={paginateData} />
        </div>
      </Container>
    </Layout>
  );
};

interface BlogListLayoutData {
  posts: BlogListDataNode[];
  paginateData: PaginateData;
}

export default BlogListLayout;
