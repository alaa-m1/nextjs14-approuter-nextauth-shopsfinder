"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
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
        disableRipple
        disableAnimation
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
            <MdOutlineDarkMode size={24}/>
          ) : theme === "light" ? (
            <MdOutlineLightMode size={24}/>
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
