import React from "react";

const Author = ({
  name,
  pic,
  about,
}: {
  name: string;
  pic: string;
  about: string;
}) => {
  return (
    <div
      className="py-5 my-12 mx-5 flex md:flex-row flex-col"
      style={{
        borderBottom: "1px solid var(--author-border)",
        borderTop: "1px solid var(--author-border)",
        width: "calc(100% - 40px)",
      }}
    >
      <div className="flex justify-center items-center">
        <img src={pic} className="rounded-full w-1/5 md:w-1/2" alt="author" />
      </div>
      <div>
        <p className="text-lg font-bold mb-2">{name}</p>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default Author;
