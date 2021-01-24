import React, { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`mt-24 container mx-auto px-12 md:px-20 lg:px-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
