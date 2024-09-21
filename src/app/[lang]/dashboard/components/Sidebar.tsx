"use client";
import React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { StyledLink, sideBarLinks, useUserInfo } from "@/shared";
import { SideBarLinkInfo } from "@/types";
import { useSearchParams } from "next/navigation";
import { AdminLogo } from "./AdminLogo";

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
  const { userInfo, status } = useUserInfo();
  const searchParams = useSearchParams();
  return !isSmallScreen ? (
    <aside
      className={`h-full mr-1 px-1 bg-gray-500 rounded-sm shadow-sm transition-all duration-700 w-[20px] [&_span]:text-ellipsis [&_span]:text-nowrap ${
        fullWidth && "sidebar-transform-active"
      }`}
    >
      <div className="flex justify-between mx-1">
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
      </div>
      {fullWidth && (
        <div className="flex flex-col justify-center mt-2">
          <div className="[&>div]:w-auto">
            <AdminLogo
              imgSrc={userInfo.image.imgURL}
              name={userInfo.firstName + " " + userInfo.lastName}
              verticalAlignment
              isLoading={status === "loading"}
            />
          </div>
          {drawerLinks.map((link, index) => {
            if (link.label !== "")
              return (
                <div
                  key={index}
                  className="p-0 w-full [&_a]:inline-block [&_a]:w-full"
                >
                  <StyledLink
                    href={`/dashboard?p=${link.path}`}
                    style={{ width: "100%", padding: "8px 16px" }}
                    active={searchParams?.get("p") === link.path}
                    label={link.label}
                  />
                </div>
              );
            return <div key={index}>&nbsp;</div>;
          })}
        </div>
      )}
    </aside>
  ) : (
    <nav className="flex h-auto p-[2px] bg-gray-500 rounded-sm shadow-sm m-1">
      <ul className="list-none flex flex-wrap flex-grow w-full gap-4 m-1">
        {drawerLinks.map((link, index) => {
          if (link.label !== "")
            return (
              <StyledLink
                key={index}
                href={`/dashboard?p=${link.path}`}
                active={searchParams?.get("p") === link.path}
                label={link.label}
              />
            );
          return null;
        })}
      </ul>
      <AdminLogo
        imgSrc={userInfo.image.imgURL}
        name={userInfo.firstName + " " + userInfo.lastName}
        isLoading={status === "loading"}
      />
    </nav>
  );
};
