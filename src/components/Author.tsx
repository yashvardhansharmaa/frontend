import React from "react";
import Img, { FixedObject } from "gatsby-image";
import { Link } from "gatsby";
import NoImage from "./NoImage";

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
    <Link to={`/author/${name.toLowerCase()}`}>
      <div
        // className="py-5 my-12 mx-5 flex md:flex-row flex-col"
        className="py-5 mx-5 flex items-center"
        style={{
          width: "calc(100% - 40px)",
        }}
      >
        {pic ? (
          <Img
            fixed={pic.imageFile.childImageSharp.fixed}
            className="rounded-full w-12 h-12 md:w-16 md:h-16"
            alt={name}
          />
        ) : (
          <NoImage className="rounded-full w-12 h-12 md:w-16 md:h-16" />
        )}

        {/* </div> */}
        <div className="px-2 md:px-6">
          <p className="text-lg font-bold mb-2">{name}</p>
          <p>{about}</p>
        </div>
      </div>
    </Link>
  );
};

export default Author;
