import React from "react";
import Img, { FluidObject } from "gatsby-image";

const Author = ({
  name,
  pic,
  about,
}: {
  name: string;
  pic: FluidObject;
  about: string;
}) => {
  return (
    <div
      // className="py-5 my-12 mx-5 flex md:flex-row flex-col"
      className="py-5 my-12 mx-5 flex justify-center items-center"
      style={{
        borderBottom: "1px solid var(--author-border)",
        borderTop: "1px solid var(--author-border)",
        width: "calc(100% - 40px)",
      }}
    >
      {/* <div className="flex justify-center items-center"> */}
      {/* <img src={pic} className="rounded-full w-1/5 md:w-1/2" alt="author" /> */}
      <Img
        fluid={pic}
        className="rounded-full w-12 h-12 md:w-16 md:h-16"
        alt={name}
      />
      {/* </div> */}
      <div className=" px-2 md:px-10">
        <p className="text-lg font-bold mb-2">{name}</p>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default Author;
