import React, { ReactNode } from "react";

const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`md:mt-24 container mx-auto px-12 md:px-24 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
