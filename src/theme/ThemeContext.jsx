import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeCtx = createContext(null);

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  // mode id a "user defined" | "system" theme
  // "light" | "dark" | "system"

  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved || "system";
  });

  // actual theme,
  const [theme, setTheme] = useState(() =>
    mode === "system" ? getSystemTheme() : mode
  );

  // reaction for change mode (light/dark/system):
  useEffect(() => {
    if (mode === "system") {
      setTheme(getSystemTheme());
    } else {
      setTheme(mode);
    }
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  // system theme signup if "system" selected
  useEffect(() => {
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme(getSystemTheme());
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [mode]);

  // instant <html> theme application:
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      mode,
      theme,
      setMode,
      toggle: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
      setLight: () => setMode("light"),
      setDark: () => setMode("dark"),
      setSystem: () => setMode("system"),
    }),
    [mode, theme]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
