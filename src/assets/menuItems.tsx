export const menuItems: item[] = [
  {
    name: "About",
    link: "/about",
    subItems: [
      {
        name: "Our Work",
        href: "our-work",
      },
      {
        name: "Our Team",
        href: "our-team",
      },
      {
        name: "Our Partners",
        href: "our-partners",
      },
    ],
  },
  {
    name: "Blog",
    link: "/blog",
    subItems: [
      {
        name: "Economics",
        href: "/eco",
      },
      {
        name: "History",
        href: "history",
      },
    ],
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
  subItems?: subItem[];
}

export interface subItem {
  name: string;
  href: string;
}
