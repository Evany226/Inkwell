// import { useState, ReactNode, createContext, useContext } from "react";

// type Theme = "light" | "dark";

// interface ThemeContextProps {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// const ThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [theme, setTheme] = useState<Theme>("light");

//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// function useTheme() {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a Theme Provider ");
//   }
//   return context;
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export { ThemeProvider, useTheme };

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): ThemeContextProps => {
  const prevTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState<Theme>(
    prevTheme === "light" || prevTheme === "dark" ? prevTheme : "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};
