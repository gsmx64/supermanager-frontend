import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@heroui/react";

import { useTheme } from "@/core/hooks/useTheme";
import toToast from "@/core/utils/toToast";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";


export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (theme === null) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }
  }, [theme]);

  const setDarkTheme = () => {
    setTheme('dark');
    toToast({
      description: t('theme.switched-to-dark'),
      title: t('theme.theme-changed'),
      color: "success",
      shorter: true
    });
  }

  const setLightTheme = () => {
    setTheme('light');
    toToast({
      description: t('theme.switched-to-light'),
      title: t('theme.theme-changed'),
      color: "success",
      shorter: true
    });
  }

  return (
    <Button variant="light" isIconOnly>
      {(theme === "light") ? (
        <SunIcon
          data-set-theme="dark"
          data-act-class="ACTIVECLASS"
          onClick={() => setDarkTheme()}
          className={"fill-current w-6 h-6 "}
        />
      ) : (
        <MoonIcon
          data-set-theme="light"
          data-act-class="ACTIVECLASS"
          onClick={() => setLightTheme()}
          className={"fill-current w-6 h-6 "}
        />
      )}
    </Button>
  )
};