import React from "react";

const BigBlogCard = () => (
  <div className="md:grid my-5 flex flex-col md:grid-cols-2">
    <img
      src="https://source.unsplash.com/bli6Z7xsPGE"
      className="w-full rounded-lg"
      alt=""
    />
    <div className="md:px-5 py-2 flex flex-col justify-between">
      <div className="">
        <div className="text-sm">
          <span className="font-semibold">Economics </span>|{" "}
          <span className="opacity-75"> November 2, 2020 </span>
        </div>
        <h1 className="text-4xl py-2 font-heading">
          History of the Nuremberg Laws
        </h1>
        <p className="leading-loose">
          The creation of the Nazi Party in 1920, after Germany’s loss in World
          War I, was a monumental period in history.
        </p>
      </div>
      <div className="mt-1 md:mt-0 flex">
        <img
          className="md:h-12 md:w-12 h-8 w-8 rounded-full"
          src="https://res.cloudinary.com/mihirgupta22/image/upload/v1604430975/small_Mihir_Gupta_square_718b30e40b.jpg"
          alt=""
        />
        <span className="mx-2 mt-1 font-semibold">Mihir Gupta</span>
      </div>
    </div>
  </div>
);

export default BigBlogCard;
