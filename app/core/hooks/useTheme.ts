import { useCallback, useEffect, useState } from "react";

// Utility to check if running on client
const isClient = typeof window !== "undefined" && typeof document !== "undefined";

// constant properties for Theme
export const ThemeProps = {
  // localStorage key for storing the current theme
  KEY: "theme",
  // light theme
  LIGHT: "light",
  // dark theme
  DARK: "dark",
  // system theme
  SYSTEM: "system",
} as const;

// type definition for Theme using system theme names or custom theme names
export type customTheme = string;
export type Theme =
  | typeof ThemeProps.LIGHT
  | typeof ThemeProps.DARK
  | typeof ThemeProps.SYSTEM
  | customTheme;

/**
 * React hook to switch between themes
 *
 * @param defaultTheme the default theme name (e.g. light, dark, purple-dark and etc)
 * @returns An object containing the current theme and theme manipulation functions
 */
export function useTheme(defaultTheme: Theme = ThemeProps.SYSTEM) {
  const MEDIA = "(prefers-color-scheme: dark)";

  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isClient) {
      const storedTheme = localStorage.getItem(ThemeProps.KEY) as Theme | null;

      if (storedTheme) {
        setThemeState(storedTheme);
      } else if (defaultTheme === ThemeProps.SYSTEM) {
        setThemeState(window.matchMedia?.(MEDIA).matches ? ThemeProps.DARK : ThemeProps.LIGHT);
      }
      setMounted(true);
    }
  }, [defaultTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      if (isClient) {
        const targetTheme =
          newTheme === ThemeProps.SYSTEM
            ? window.matchMedia?.(MEDIA).matches
              ? ThemeProps.DARK
              : ThemeProps.LIGHT
            : newTheme;

        localStorage.setItem(ThemeProps.KEY, newTheme);

        document.documentElement.classList.remove(
          ThemeProps.LIGHT,
          ThemeProps.DARK,
          ThemeProps.SYSTEM,
        );

        document.documentElement.classList.add(targetTheme);
      }

      setThemeState(newTheme);
    },
    [theme],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      if (defaultTheme === ThemeProps.SYSTEM) {
        setTheme(e.matches ? ThemeProps.DARK : ThemeProps.LIGHT);
      }
    },
    [defaultTheme, setTheme]
  );

  useEffect(() => {
    if (isClient) {
      setTheme(theme);
    }
  }, [theme, setTheme]);

  useEffect(() => {
    if (!isClient) return;
    const media = window.matchMedia(MEDIA);

    media.addEventListener("change", handleMediaQuery);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  return { theme: mounted ? theme : defaultTheme, setTheme };
}
