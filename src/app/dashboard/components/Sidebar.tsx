"uxs client";
import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { StyledLink, sideBarLinks } from "@/shared";
import { SideBarLinkInfo } from "@/types";
import { useSearchParams } from "next/navigation";

type CustomDrawerProps = {
  fullWidth: boolean;
  isSmallScreen: boolean;
  onCloseSideBar: (value: boolean) => void;
};

export const Sidebar = ({
  fullWidth,
  isSmallScreen,
  onCloseSideBar,
}: CustomDrawerProps) => {
  const drawerLinks: Array<SideBarLinkInfo> = [
    ...sideBarLinks,
    { path: "", label: "" },
  ];
  const searchParams = useSearchParams();
  return !isSmallScreen ? (
    <aside
      className={`h-full mr-1 bg-[#ccc] transition-all duration-700 w-[20px] [&_span]:text-ellipsis [&_span]:text-nowrap ${
        fullWidth && "sidebar-transform-active"
      }`}
    >
      <div className="flex justify-between m-1">
        <button
          id="toggle-sidebar"
          aria-label="toggle sidebar menu"
          onClick={() => onCloseSideBar(!fullWidth)}
          className="mt-1"
        >
          {fullWidth ? (
            <MdArrowBackIos className="text-white font-bold" />
          ) : (
            <MdArrowForwardIos className="text-white font-bold" />
          )}
        </button>
        {fullWidth && (
          <StyledLink href={"/dashboard"} style={{ width: "100%" }}>
            User Dashboard
          </StyledLink>
        )}
      </div>
      {fullWidth &&
        drawerLinks.map((link, index) => {
          if (link.label !== "")
            return (
              <div
                key={index}
                className="p-0 w-full [&_a]:inline-block [&_a]:w-full"
              >
                <StyledLink
                  href={`/dashboard?p=${link.path}`}
                  style={{ width: "100%", padding: "8px 16px" }}
                  active={searchParams.get("p") === link.path}
                >
                  {link.label}
                </StyledLink>
              </div>
            );
          return <div key={index}>&nbsp;</div>;
        })}
    </aside>
  ) : (
    <nav>
      <ul className="list-none flex flex-wrap w-full gap-4 m-1">
        {drawerLinks.map((link, index) => {
          if (link.label !== "")
            return (
              <StyledLink
                key={index}
                href={`/dashboard?p=${link.path}`}
                active={searchParams.get("p") === link.path}
              >
                {link.label}
              </StyledLink>
            );
          return <div key={index}>&nbsp;</div>;
        })}
      </ul>
    </nav>
  );
};
