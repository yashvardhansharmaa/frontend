import React, { ReactNode } from "react";

export const Paragraph = ({ children }: ParaProps) => {
  return <p className="md:px-0 px-6 py-4">{children}</p>;
};

export const List = ({
  children,
  ordered,
}: {
  children: string;
  ordered: boolean;
}) => {
  return (
    <>
      {ordered ? (
        <ol className="text-2xl list-decimal ml-20">{children}</ol>
      ) : (
        <ul className="text-2xl list-disc ml-20">{children}</ul>
      )}
    </>
  );
};

export const Image = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img src={src} className="mx-auto medium-zoom" loading="lazy" alt={alt} />
  );
};

export const Heading = ({ children, level }: HeadingProps) => (
  <h1
    className={`subheading tracking-tight md:px-0 px-6 pt-4 ${
      headings[level as keyof HeadingTypes]
    }`}
    style={{
      fontWeight: 600,
    }}
  >
    {children}
  </h1>
);

export const HorizontalRule = () => <hr className="my-5" />;

export const Link = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a rel="noopener noreferrer" target="_blank" href={href}>
    {children}
  </a>
);

export const Blockquote = ({ children }: ParaProps) => (
  <blockquote className="relative my-5">{children}</blockquote>
);

interface HeadingTypes {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
}

const headings: HeadingTypes = {
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
  4: "text-lg",
  5: "text-md",
  6: "text-xl",
};

interface ParaProps {
  children: string | ReactNode;
}

interface HeadingProps {
  children: string | ReactNode;
  level: number | string;
}
