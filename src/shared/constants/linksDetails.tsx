import React from "react";
import { LinkInfo, SideBarLinkInfo } from "@/types";
import RoofingIcon from '@mui/icons-material/Roofing';
import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

export const NavLinks: Array<LinkInfo> = [
  {
    label: "home",
    path: "/",
    protected: false,
    icon: <RoofingIcon fontSize="medium" />,
  },
  {
    label: "Shops",
    path: "/shops",
    protected: true,
    icon: <LocalGroceryStoreIcon fontSize="medium" />,
  },
  {
    label: "products",
    path: "/products",
    protected: false,
    icon: <DynamicFeedIcon fontSize="medium" />,
  },
  {
    label: "dashboard",
    path: "/dashboard",
    protected: true,
    icon: <DashboardIcon fontSize="medium" />,
  },
  {
    label: "about",
    path: "/about",
    protected: false,
    icon: <HelpOutlineIcon fontSize="medium" />,
  },
];

export const sideBarLinks: Array<SideBarLinkInfo> = [
  { label: "Profile", path: "profile", icon: <BadgeIcon fontSize="medium" /> },
  {
    label: "settings",
    path: "settings",
    icon: <ManageAccountsIcon fontSize="medium" />,
  },
];
