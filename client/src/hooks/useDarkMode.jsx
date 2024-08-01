import { useState, useEffect } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    const prevTheme = theme === "dark" ? "light" : "dark";
    root.classList.remove(prevTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

export default useDarkMode;
