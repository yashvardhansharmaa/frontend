import React from "react";
import Author from "../../components/Author";
import Layout from "../../components/Layout";

const intro = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div className="container flex flex-col justify-center items-center my-10">
          <div className="flex justify-start items-start w-full px-20">
            October 26, 2020
          </div>
          <h1 className="text-5xl">Montgomery Bus Boycott</h1>
        </div>
        <img
          src="https://source.unsplash.com/N9UuFddi7hs"
          style={{ height: "auto" }}
          alt=""
          // md:w-9/12
          className="w-full"
        />
        <div className="container my-10 border border-black leading-relaxed h-screen">
          The Montgomery Bus Boycott was a mass civil rights protest against
          Montgomery, Alabama’s segregated bus system, during which civil
          activists and African Americans refused to ride city buses for 381
          days. Eventually, this led to a 1956 U.S. Supreme Court decision
          declaring Montgomery’s laws on the segregation of buses
          unconstitutional. On March 2, 1955, Claudette Colvin, a high school
          student in Montgomery, Alabama, boarded the city bus. She was the
          first person to challenge the segregation of buses by refusing to give
          up her seat. Colvin was eventually arrested for her refusal and
          screamed, “It’s my constitutional right,” as the police dragged her
          out of the bus. The Black representatives planned to protest using
          Colvin as their leading figure. However, it was discovered that she
          was pregnant and deemed an inappropriate symbol for their cause.
          Claudette is not a much-celebrated figure in the African-American
          Civil Rights Movement but was a pioneer and instrumental along with
          three other women (Aurelia S. Browder, Susie McDonald, and Mary Louise
          Smith). In Browder v. Gayle’s case, which ultimately defined
          segregation on buses as unconstitutional across the states.
        </div>
      </div>
      <Author />
    </Layout>
  );
};

export default intro;
