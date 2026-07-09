import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext();

const fontMap = {
  Inter: "var(--font-inter)",
  "Noto Serif": "var(--font-noto-serif)",
  "Source Code Pro": "var(--font-source-code-pro)",
};

const colorMap = {
  blue: {
    accent: "var(--color-blue-500)",
    accentSoft: "var(--color-blue-50)",
    accentText: "white",
  },
  green: {
    accent: "var(--color-green-500)",
    accentSoft: "var(--color-green-100)",
    accentText: "white",
  },
  red: {
    accent: "var(--color-red-500)",
    accentSoft: "var(--color-red-100)",
    accentText: "white",
  },
};

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("themeColor") || "blue";
  });
  const [fontTheme, setFontTheme] = useState(() => {
    return localStorage.getItem("fontTheme") || "Inter";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem("themeColor", themeColor);
    const theme = colorMap[themeColor] || colorMap.blue;
    document.documentElement.style.setProperty("--accent", theme.accent);
    document.documentElement.style.setProperty(
      "--accent-soft",
      theme.accentSoft,
    );
    document.documentElement.style.setProperty(
      "--accent-text",
      theme.accentText,
    );
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem("fontTheme", fontTheme);
    document.documentElement.style.setProperty(
      "--font",
      fontMap[fontTheme] || fontMap.Inter,
    );
  }, [fontTheme]);

  const value = useMemo(
    () => ({
      themeMode,
      themeColor,
      fontTheme,
      setThemeMode,
      setThemeColor,
      setFontTheme,
    }),
    [themeMode, themeColor, fontTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
