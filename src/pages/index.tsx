import React, { FC } from "react"
import { Link, PageProps } from "gatsby"
import styled from "styled-components"
import DarkToggle from "../components/DarkToggle"

const Div = styled.div`
  height: 50vh;
  background-color: var(--color-background);
`

const IndexPage: FC<PageProps> = () => {
  return (
    <div>
      <Div>
        <h1>Hello</h1>
      </Div>
      <DarkToggle />
    </div>
  )
}

export default IndexPage
