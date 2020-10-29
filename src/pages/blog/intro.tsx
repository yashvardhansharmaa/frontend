import React from "react";
import Author from "../../components/Author";
import Layout from "../../components/Layout";

const intro = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center maindiv">
        <div className="container">
          <div className="py-5 flex justify-center items-center">
            <img
              src="https://source.unsplash.com/N9UuFddi7hs"
              alt=""
              // md:w-9/12
              className="md:w-1/2 w-full h-auto"
            />
          </div>
          <div className="flex flex-col justify-center items-center my-10">
            <div className="flex justify-start opacity-75 text-sm items-start w-full md:px-0 px-5">
              October 26, 2020
            </div>
            <h1 className="md:text-6xl text-5xl my-5 font-heading">
              Montgomery Bus Boycott
            </h1>
          </div>
          <div className="text-lg leading-relaxed font-body">
            <p className="md:px-0 px-6">
              The Montgomery Bus Boycott was a mass civil rights protest against
              Montgomery, Alabama’s segregated bus system, during which civil
              activists and African Americans refused to ride city buses for 381
              days. Eventually, this led to a 1956 U.S. Supreme Court decision
              declaring Montgomery’s laws on the segregation of buses
              unconstitutional.
            </p>
            <img
              src="https://source.unsplash.com/WiE01mC9AtY"
              alt=""
              // md:w-9/12
              className="py-5 w-full h-auto"
            />
            <p className="md:px-0 px-6">
              On March 2, 1955, Claudette Colvin, a high school student in
              Montgomery, Alabama, boarded the city bus. She was the first
              person to challenge the segregation of buses by refusing to give
              up her seat. Colvin was eventually arrested for her refusal and
              screamed, “It’s my constitutional right,” as the police dragged
              her out of the bus.
            </p>
            <br />
            <p className="md:px-0 px-6">
              The Black representatives planned to protest using Colvin as their
              leading figure. However, it was discovered that she was pregnant
              and deemed an inappropriate symbol for their cause. Claudette is
              not a much-celebrated figure in the African-American Civil Rights
              Movement but was a pioneer and instrumental along with three other
              women (Aurelia S. Browder, Susie McDonald, and Mary Louise Smith).
              In Browder v. Gayle’s case, which ultimately defined segregation
              on buses as unconstitutional across the states.
            </p>
          </div>
          <div className="md:px-0 px-6 py-8">
            <Author />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default intro;
