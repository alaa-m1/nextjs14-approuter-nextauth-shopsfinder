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
      <div className="m-auto w-[500px] h-[300px] shadow-md hover:shadow-lg">
        <div className="flex flex-col h-full text-black p-3">
          <div className="flex grow">{children}</div>
          <>
            <div className="flex justify-center mb-[10px] py-0 px-[10px]">
              <div className="w-[30%] bg-[#ccc] h-[2px] my-[7px] mx-[5px]" />
              <span className="w-[30%] text-[#ccc] font-bold">
                Or continue with
              </span>
              <div className="w-[30%] bg-[#ccc] h-[2px] my-[7px] mx-[5px]" />
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-center justify-items-center gap-x-0.5 gap-y-2">
              <div className="normal-case">
                <button onClick={() => console.log("Sign in using Google")}>
                  <div className="flex flex-col">
                    <BsGoogle className="self-center" />
                    Google
                  </div>
                </button>
              </div>
              <div className="normal-case">
                <button onClick={() => console.log("Sign in using Facebook")}>
                  <div className="flex flex-col">
                    <BsFacebook className="self-center" />
                    <span> Facebook</span>
                  </div>
                </button>
              </div>
            </div>
          </>

          <ColoredDevider />
          {pathName === "/signup" ? (
            <div className="w-full flex flex-row justify-between [#_button]:hover:bg-transparent">
              <div className="grow-[1] size-5 text-black">
                If you already have an account &nbsp;
              </div>
              <LinkButton
                label="Sign In"
                style={{ color: "primary.light", fontSize: "15px" }}
                data-testid="Auth-btn-signin"
                to="signin"
              />
            </div>
          ) : (
            <div className="w-full flex flex-row justify-between [#_button]:hover:bg-transparent">
              <div className="grow-[1] size-5 text-black">
                If you do not have an account &nbsp;
              </div>

              <LinkButton
                label="Sign Up"
                style={{ color: "primary.light", fontSize: "15px" }}
                data-testid="Auth-btn-signup"
                to="signup"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
