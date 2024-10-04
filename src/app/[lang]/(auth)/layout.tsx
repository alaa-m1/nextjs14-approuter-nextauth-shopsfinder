import { ColoredDevider, LoadingSpinner } from "@/shared";
import React, { Suspense } from "react";
import { AuthFooter, ProvidersPanel } from "./components";
const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="m-auto w-[500px] min-h-[300px] shadow-md hover:shadow-lg">
        <div className="flex flex-col h-full text-black p-3">
          <div className="flex grow">{children}</div>

          <div className="flex justify-center mb-[10px] py-0 px-0.5 w-full">
            <div className="flex-grow bg-[#ccc] h-[2px] my-[7px] mx-[5px]" />
            <span className="w-auto text-[#555] font-bold dark:text-dark-text">
              Or continue with
            </span>
            <div className=" flex-grow bg-[#ccc] h-[2px] my-[7px] mx-[5px]" />
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <ProvidersPanel />
          </Suspense>

          <ColoredDevider />
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
