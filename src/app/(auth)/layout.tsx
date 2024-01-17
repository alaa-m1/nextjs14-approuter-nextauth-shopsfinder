"use client";
import { ColoredDevider, LinkButton } from "@/shared";
import { usePathname } from "next/navigation";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  return (
    <div className="flex h-full">
      <div className="m-auto w-[500px] min-h-[300px] shadow-md hover:shadow-lg">
        <div className="flex flex-col h-full text-black p-3">
          <div className="flex grow">{children}</div>

          <div className="flex justify-center mb-[10px] py-0 px-0.5 w-full">
            <div className="flex-grow bg-[#ccc] h-[2px] my-[7px] mx-[5px]" />
            <span className="w-auto text-[#ccc] font-bold">
              Or continue with
            </span>
            <div className=" flex-grow bg-[#ccc] h-[2px] my-[7px] mx-[5px]" />
          </div>
          <div className="grid grid-cols-2 justify-center justify-items-center gap-x-0.5 gap-y-2">
            <div>
              <button onClick={() => console.log("Sign in using Google")}>
                <div className="flex flex-col items-center">
                  <BsGoogle />
                  Google
                </div>
              </button>
            </div>
            <div>
              <button onClick={() => console.log("Sign in using Facebook")}>
                <div className="flex flex-col items-center">
                  <BsFacebook />
                  <span> Facebook</span>
                </div>
              </button>
            </div>
          </div>

          <ColoredDevider />
          {pathName === "/signup" ? (
            <div className="w-full flex flex-row justify-left [#_button]:hover:bg-transparent">
              <div className="w-auto size-5 text-black text-ellipsis overflow-hidden ">
                If you already have an account &nbsp;
              </div>
              <LinkButton href="/signin" className="size-[15px]">
                Sign In
              </LinkButton>
            </div>
          ) : (
            <div
              className="w-full flex flex-row justify-left [#_button]:hover:bg-transparent"
            >
              <div className="w-auto size-5 text-black text-ellipsis overflow-hidden ">
                If you do not have an account &nbsp;
              </div>
              <LinkButton href="/signup" className="size-[15px]">
                Sign Up
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
