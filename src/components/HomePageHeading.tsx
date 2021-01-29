import React, { ReactNode } from "react";

const HomePageHeading = ({ children }: { children: ReactNode }) => {
  return (
    <h1
      className="font-heading border-b-3 border-primary md:w-4/12 mx-auto text-5xl md:text-7xl text-center mb-12"
      //   style={{ width: "80%" }}
    >
      {children}
    </h1>
  );
};

export default HomePageHeading;
