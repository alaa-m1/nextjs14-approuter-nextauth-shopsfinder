import { LinkInfo, SideBarLinkInfo } from "@/types";


export const NavLinks: Array<LinkInfo> = [
  { label: "home", path: "/" , protected:false},
  { label: "Shops", path: "/shops", protected:true },
  { label: "products", path: "/products", protected:false },
  { label: "dashboard", path: "/dashboard", protected:true },
  { label: "about", path: "/about", protected:false },
];

export const sideBarLinks: Array<SideBarLinkInfo> = [
  { label: "Profile", path: "profile" },
  { label: "settings", path: "settings" },
];