import { BlogListDataNode } from "../templates/blog_list_template";

export default (a: BlogListDataNode, b: BlogListDataNode) => {
  // b - a, since I want descending
  return +new Date(b.published_date) - +new Date(a.published_date);
};
