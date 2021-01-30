import React from "react";
import { BlogListDataNode } from "../templates/blog_list_template";
import BlogBanner from "./BlogBanner";
import BlogCard from "./BlogCard";
import Layout from "./Layout";
import PaginateButtons, { PaginateData } from "./PaginateButtons";
import PostListContainer from "./PostListContainer";

const BlogListLayout = ({ posts, paginateData }: BlogListLayoutData) => {
  return (
    <Layout>
      <div className="mt-24 container mx-auto px-4 md:px-20 lg:px-10">
        <div className="md:text-7xl text-5xl mb-4 font-heading text-center">
          Our Articles
        </div>
        <BlogBanner />
        <PostListContainer>
          {posts.map((post) => (
            <BlogCard content={post} key={post.slug} />
          ))}
        </PostListContainer>
        <div className="flex my-10 justify-center">
          <PaginateButtons data={paginateData} />
        </div>
      </div>
    </Layout>
  );
};

interface BlogListLayoutData {
  posts: BlogListDataNode[];
  paginateData: PaginateData;
}

export default BlogListLayout;
