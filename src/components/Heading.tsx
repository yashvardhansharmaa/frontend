import React, { ReactNode } from "react";

const Heading = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`text-7xl font-heading text-center ${className}`}>
      {children}
    </h1>
  );
};

export default Heading;
