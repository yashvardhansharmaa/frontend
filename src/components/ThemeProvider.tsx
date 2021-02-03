import React, { useContext, createContext, ReactNode, useState } from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
const ThemeContext = createContext({ theme: false, toggleTheme: () => {} });
const VisitedContext = createContext({
  timesVisited: 0,
  increaseTimesVisited: () => {},
});

const VisitedProvider = ({ children }: { children: ReactNode | string }) => {
  const [timesVisited, setTimesVisited] = useState(0);
  const increaseTimes = () => {
    setTimesVisited((val) => val + 1);
  };
  return (
    <VisitedContext.Provider
      value={{ timesVisited, increaseTimesVisited: increaseTimes }}
    >
      {children}
    </VisitedContext.Provider>
  );
};

const ThemeProvider = ({ children }: { children: ReactNode | string }) => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }: ThemeProps) => {
        const isDark: boolean = theme === "dark" ? true : false;
        return (
          <ThemeContext.Provider
            value={{
              theme: isDark,
              toggleTheme: () =>
                toggleTheme(theme === "dark" ? "light" : "dark"),
            }}
          >
            {children}
          </ThemeContext.Provider>
        );
      }}
    </ThemeToggler>
  );
};

interface ThemeProps {
  theme: "light" | "dark";
  toggleTheme: (theme: string) => void;
}

export const useTheme = () => useContext(ThemeContext);
export const useTimesVisited = () => useContext(VisitedContext);

export default ({ element }: { element: ReactNode }) => (
  <VisitedProvider>
    {" "}
    <ThemeProvider>{element}</ThemeProvider>
  </VisitedProvider>
);
