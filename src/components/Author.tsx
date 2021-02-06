import React from "react";
import Img, { FixedObject } from "gatsby-image";
import { Link } from "gatsby";
import NoImage from "./NoImage";
import NoPersonImage from "./NoPersonImage";

// .imageFile.childImageSharp.fixed

interface PicType {
  imageFile: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

const Author = ({
  name,
  pic,
  about,
}: {
  name: string;
  pic: PicType;
  about: string;
}) => {
  return (
    <div
      // className="py-5 my-12 mx-5 flex md:flex-row flex-col"
      className="py-5 mx-5 flex items-center"
      // style={{
      //   width: "calc(100% - 40px)",
      // }}
    >
      <div className="">
        {pic ? (
          <Img
            fixed={pic.imageFile.childImageSharp.fixed}
            // className="rounded-full w-12 h-12 md:w-16 md:h-16"
            className="rounded-full h-full w-full"
            alt={name}
          />
        ) : (
          // <NoImage className="rounded-full w-12 h-12 md:w-16 md:h-16" />
          <NoPersonImage className="rounded-full w-12 h-12 md:w-16 md:h-16" />
        )}
      </div>

      {/* </div> */}
      <div className="px-2 md:px-6">
        <Link to={`/author/${name.toLowerCase()}`}>
          <p className="text-lg font-bold mb-2">{name}</p>
        </Link>
        <p>{about}</p>
      </div>
    </div>
  );
};

export default Author;
