import React from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { useTheme } from "./ThemeProvider";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <DarkModeToggle
      onChange={toggleTheme}
      size={50}
      speed={3}
      checked={theme}
    />
  );
};

export default ThemeToggler;
