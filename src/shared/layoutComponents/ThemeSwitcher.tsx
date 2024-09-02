"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import { useTheme } from "next-themes";
import { CustomIconButton } from "../components";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeMenuClick = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const themeButton = useMemo(
    () => (
      <CustomIconButton
        onClick={handleThemeMenuClick}
        icon={
          theme === "dark" ? (
            <DarkModeIcon sx={{ "& path": { color: "warning.main" } }} />
          ) : theme === "light" ? (
            <LightModeIcon />
          ) : (
            <ScreenshotMonitorIcon />
          )
        }
      />
    ),
    [handleThemeMenuClick, theme]
  );
  if (!mounted) return null;
  return <>{themeButton}</>;
};
