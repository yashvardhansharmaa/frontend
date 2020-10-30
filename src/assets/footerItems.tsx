export const footerItems: item[] = [
  {
    heading: "About",
    subItems: [
      {
        name: "Economics",
        href: "/economics",
      },
      {
        name: "History",
        href: "/history",
      },
    ],
  },
  {
    heading: "About",
    subItems: [
      {
        name: "Our Team",
        href: "/ourteam",
      },
      {
        name: "Our Work",
        href: "/ourwork",
      },
      {
        name: "Our Partners",
        href: "/ourpartners",
      },
    ],
  },
];

export interface item {
  heading: string;
  subItems: subItem[];
}

export interface subItem {
  name: string;
  href: string;
}
