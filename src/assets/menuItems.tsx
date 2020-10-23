export const menuItems: item[] = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Podcast",
    link: "/podcast",
  },
  {
    name: "Work with Us",
    link: "/work",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
];

export interface item {
  link: string;
  name: string;
}
