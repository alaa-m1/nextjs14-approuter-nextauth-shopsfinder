"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { SMALL_SCREEN_SIZE } from "@/shared";

export const useSmallScreen = () => {
    const [isClient, setIsClient] = useState(false)
    const isSmallScreen = useMediaQuery(`(max-width: ${SMALL_SCREEN_SIZE})`) && isClient;

    useEffect(() => {
        setIsClient(true)
    }, [])

    return isSmallScreen;
}