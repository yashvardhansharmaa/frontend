import React, { FC } from "react";
import { Link, PageProps } from "gatsby";
import styled from "styled-components";
import "../assets/styles/Global.css";
import DarkLightSwitch from "../components/DarkLightSwitch";

const Div = styled.div`
  height: 50vh;
  background-color: black;
`;

const IndexPage: FC<PageProps> = () => {
  return (
    <div>
      <h1>Hello</h1>
      <DarkLightSwitch />
    </div>
  );
};

export default IndexPage;
