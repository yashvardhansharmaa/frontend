import React, { FC } from "react";
import { Link, PageProps } from "gatsby";
import styled from "styled-components";
import DarkLightSwitch from "../components/DarkLightSwitch";
import Navbar from "../components/Navbar";

const Div = styled.div`
  height: 50vh;
  background-color: black;
`;

const IndexPage: FC<PageProps> = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default IndexPage;
