import React from "react"

import { ThemeContext } from "./ThemeContext"
import { DarkModeToggler } from "react-darkmode-toggler"

const DarkToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  // button toggler
  const darkModeHandler = () => {
    setColorMode(colorMode === "light" ? "dark" : "light")
  }

  if (!colorMode) {
    return null
  }

  return <DarkModeToggler onClick={darkModeHandler} isDark={colorMode} />
}

export default DarkToggle
