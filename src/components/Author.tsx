import React from "react";

const Author = () => {
  return (
    <div
      className="w-full py-5 flex md:flex-row flex-col"
      style={{
        borderColor: "rgba(0,0,0,0.2)",
        borderBottom: "1px solid",
        borderTop: "1px solid",
      }}
    >
      <div className="flex justify-center items-center">
        <img
          src="https://source.unsplash.com/rDEOVtE7vOs/500x500"
          className="rounded-full w-1/5 md:w-1/2"
          alt="author"
        />
      </div>
      <div>
        <p></p>
        Arielle Pardes is a senior writer at WIRED, where she works on stories
        about our relationship to our technology. Previously she was a senior
        editor for VICE. She is an alumna of the University of Pennsylvania and
        lives in San Francisco.
      </div>
    </div>
  );
};

export default Author;
