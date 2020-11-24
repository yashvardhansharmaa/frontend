import React, { CSSProperties, ReactNode } from "react";

const Heading = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <h1
      style={style}
      className={`md:text-7xl text-6xl font-heading text-center ${className}`}
    >
      {children}
    </h1>
  );
};

export default Heading;
