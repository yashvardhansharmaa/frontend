import React, { ReactNode } from "react";

const PostListContainer = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-wrap justify-between">{children}</div>;
};

export default PostListContainer;
