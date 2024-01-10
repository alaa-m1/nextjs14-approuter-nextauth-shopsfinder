"use client";
import React from "react";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import logoSrc from "@/assets/images/phoenix.png";
import { LinkInfo, User } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { StyledLink, StyledList } from "@/shared";
import { MdClose } from "react-icons/md";

type DrawerProps = {
  links: Array<LinkInfo>;
  currentUser: User | null;
  isSmallScreen: boolean;
};

export const Drawer = ({ links, currentUser, isSmallScreen }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const drawerLinks: Array<LinkInfo> = [...links, { path: "", label: "" }];
  return (
    <>
      {isSmallScreen ? (
        <>
          <button className="mx-2" type="button" aria-controls="main-drawer">
            <MdMenu
              className="text-white size-5"
              onClick={() => setOpen((p) => !p)}
            />
          </button>
          {open && (
            <div
              onClick={() => setOpen(false)}
              className="fixed top-0 bottom-0 right-0 left-0 opacity-30 bg-[#ccc]"
            ></div>
          )}
          <div
            data-dialog-backdrop="dialog"
            data-dialog-backdrop-close="true"
            id="main-drawer"
            tabIndex={-1}
            className={` shadow-with-border fixed top-0 left-0 z-102 h-screen overflow-y-auto overflow-x-hidden transition-all duration-1000 bg-white dark:bg-gray
             [&_span]:text-ellipsis [&_span]:text-nowrap
             ${
               open
                 ? "p-2 pl-4 transform-active backdrop-blur-[20px]"
                 : "transform-deactive"
             }  bg-gradient-to-b  from-indigo-900
            via-indigo-500 to-indigo-600 `}
          >
            <div className="container ">
              <div className="logo-container flex justify-between">
                <Image
                  className="ml-16 pt-6 transition-drawer duration-500"
                  src={logoSrc}
                  alt={"logo image"}
                />
                <button
                  className="pt-6"
                  type="button"
                  aria-controls="main-drawer"
                >
                  <MdClose
                    className="text-white size-4"
                    onClick={() => setOpen(false)}
                  />
                </button>
              </div>
              <StyledList aria-labelledby="nested-list-subheader">
                {drawerLinks.map((link, index) => {
                  if (link.label !== "")
                    return (
                      <div
                        className="my-2"
                        key={index}
                        onClick={() => setOpen(false)}
                      >
                        <StyledLink href={link.path}>{link.label}</StyledLink>
                      </div>
                    );
                  return <div key={index}>&nbsp;</div>;
                })}

                {currentUser ? (
                  <div
                    onClick={() => {
                      console.log("SignOut");
                      setOpen(false);
                    }}
                  >
                    <StyledLink href={"/"}>{"Sign Out"}</StyledLink>
                    <Link className="w-full" href={"/"}>
                      <span className="text-black">{"Sign Out"}</span>
                    </Link>
                  </div>
                ) : (
                  <div className="my-2" onClick={() => setOpen(false)}>
                    <StyledLink href={"/signin"}>{"Sign In"}</StyledLink>
                  </div>
                )}
              </StyledList>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
