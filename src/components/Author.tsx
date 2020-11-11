import React from "react";
import Img, { FixedObject } from "gatsby-image";

const Author = ({
  name,
  pic,
  about,
}: {
  name: string;
  pic: FixedObject;
  about: string;
}) => {
  return (
    <div
      // className="py-5 my-12 mx-5 flex md:flex-row flex-col"
      className="py-5 my-12 mx-5 flex items-center"
      style={{
        borderBottom: "1px solid var(--author-border)",
        borderTop: "1px solid var(--author-border)",
        width: "calc(100% - 40px)",
      }}
    >
      <Img
        fixed={pic}
        className="rounded-full w-12 h-12 md:w-16 md:h-16"
        alt={name}
      />
      {/* </div> */}
      <div className="px-2 md:px-6">
        <p className="text-lg font-bold mb-2">{name}</p>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default Author;
