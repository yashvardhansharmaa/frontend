import React, { FC } from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import DarkModeToggle from "react-dark-mode-toggle";

interface ThemeProps {
  theme: "light" | "dark";
  toggleTheme: (theme: string) => void;
}

const DarkLightSwitch: FC = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: ThemeProps) => {
        const isDark: boolean = theme === "dark" ? true : false;
        return (
          <DarkModeToggle
            onChange={() => toggleTheme(theme === "dark" ? "light" : "dark")}
            checked={isDark}
            size={50}
            speed={3}
          />
        );
      }}
    </ThemeToggler>
  );
};

export default DarkLightSwitch;
