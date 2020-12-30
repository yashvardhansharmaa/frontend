import { layer } from "@fortawesome/fontawesome-svg-core";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const OurPartners = () => {
  useEffect(() => {
    const getfakeData = async (): Promise<RootObject> => {
      const res = await fetch("https://reqres.in/api/users");
      return await res.json();
    };
    getfakeData().then((res) => setUserData(res.data));
  }, []);

  const [userData, setUserData] = useState<Datum[]>([]);
  return (
    <Layout>
      <Container>
        <Heading>Our Partners</Heading>
        <div className="mt-20 flex flex-col">
          {userData &&
            userData.map((user) => {
              return (
                <div className="w-full flex mb-10">
                  <div className="w-1/3 mt-2">
                    <img src={user.avatar} alt="" className="w-2/3 mx-auto" />
                  </div>
                  <div className="w-2/3">
                    <h3 className="font-heading text-3xl">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="mt-2 text-md tracking-wide pr-10">
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
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
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

export default OurPartners;
