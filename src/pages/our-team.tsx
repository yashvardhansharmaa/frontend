import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as regularEnv } from "@fortawesome/free-regular-svg-icons";

const OurTeam = () => {
  useEffect(() => {
    const getfakeData = async (): Promise<RootObject> => {
      const res = await fetch("https://reqres.in/api/users");
      return await res.json();
    };
    getfakeData().then((res) => setUserData(res.data));
    // console.log(userData);
  }, []);

  const [userData, setUserData] = useState<Datum[]>([]);

  return (
    <Layout>
      <div className="md:mt-24 container px-10 mx-auto lg:px-10">
        <Heading>Our Team</Heading>
        <div className="mt-10 w-full flex flex-wrap justify-between">
          {userData &&
            userData.map((user) => {
              return (
                <div className="flex lg:w-1/2 flex-col md:flex-row w-full mb-20">
                  {/* IMAGE SECTION */}
                  <div className="md:w-1/3 w-1/2 mr-5 mt-2 mb-5 md:mb-0">
                    <img src={user.avatar} alt="" className="w-full" />
                  </div>
                  {/* TEXT SECTION */}
                  <div className="md:w-2/3 w-full">
                    <h3 className="font-heading text-2xl">
                      {user.first_name} {user.last_name}
                    </h3>
                    <h4 className="text-xs mt-2 font-heading tracking-wider">
                      FOUNDER & CHIEF EXECUTIVE OFFICER
                    </h4>
                    <p className="mt-2 text-sm tracking-wide pr-10">
                      Anthony Casalena is the Founder and CEO of Squarespace,
                      which he started from his dorm room in 2003. During the
                      company’s early years, Anthony acted as the sole engineer,
                      designer, and support representative for the entire
                      Squarespace platform. In addition to running the company
                      and setting overall product strategy, he remains actively
                      involved in many departments of the company that he had
                      previously run himself. Anthony holds a Bachelor of
                      Science in Computer Science from the University of
                      Maryland.
                    </p>
                    <div className="flex mt-2">
                      <FontAwesomeIcon
                        icon={regularEnv}
                        size="lg"
                        fillOpacity={0.7}
                      />
                      <a href="" className="ml-3 text-font">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="0"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="none"
                            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                          ></path>
                          <circle cx="4" cy="4" r="2" stroke="none"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

interface Datum {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface Support {
  url: string;
  text: string;
}

interface RootObject {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Datum[];
  support: Support;
}

export default OurTeam;
