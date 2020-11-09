import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="md:mt-24 container mx-auto px-12 md:px-24">{children}</div>
  );
};

export default Container;
