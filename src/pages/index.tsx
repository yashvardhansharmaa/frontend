import React, { FC } from "react"
import { Link, PageProps } from "gatsby"
import styled from "styled-components"

const Div = styled.div`
  height: 50vh;
  background-color: black;
`

const IndexPage: FC<PageProps> = () => {
  return (
    <div>
      <Div>
        <h1>Hello</h1>
      </Div>
    </div>
  )
}

export default IndexPage
