"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { useIsClient } from "../hooks/useIsClient";
import { Button } from "@nextui-org/react";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeMenuClick = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);
  const isClient = useIsClient();
  const themeButton = useMemo(
    () => (
      <Button
        isIconOnly 
        onClick={handleThemeMenuClick}
        className={classNames(
          "px-2 border-none bg-transparent hover:[&>svg]:text-[#e76712] hover:[&>svg]:transition-all hover:[&>svg]:duration-300",
          { "[&>svg]:text-white": !isClient },
          {
            "[&>svg]:text-light-label [&>svg]:dark:text-dark-label":
              isClient,
          }
        )}
      >
        {
          theme === "dark" ? (
            <DarkModeIcon sx={{ "& path": { color: "warning.main" } }} />
          ) : theme === "light" ? (
            <LightModeIcon />
          ) : (
            <ScreenshotMonitorIcon />
          )
        }
      </Button>
    ),
    [handleThemeMenuClick, isClient, theme]
  );
  if (!mounted) return null;
  return <>{themeButton}</>;
};
