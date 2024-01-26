import { LinkInfo, SideBarLinkInfo } from "@/types";


export const NavLinks: Array<LinkInfo> = [
  { label: "Home", path: "/" , protected:false},
  { label: "Shops", path: "/shops", protected:true },
  { label: "Products", path: "/products", protected:false },
  { label: "Dashboard", path: "/dashboard", protected:true },
  { label: "About", path: "/about", protected:false },
];

export const sideBarLinks: Array<SideBarLinkInfo> = [
  { label: "Profile", path: "profile" },
  { label: "settings", path: "settings" },
];