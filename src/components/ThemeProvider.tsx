import React, { useContext, createContext, ReactNode } from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
const ThemeContext = createContext({ theme: false, toggleTheme: () => {} });

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

export default ({ element }: { element: ReactNode }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
