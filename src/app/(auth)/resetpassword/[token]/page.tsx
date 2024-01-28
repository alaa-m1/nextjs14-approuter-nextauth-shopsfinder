import React from "react";
import { ResetPanel } from "./component";
import { getCsrfToken } from "next-auth/react";

type ResetPasswordProps = {
  params: { token: string };
};
const Page = async ({ params }: ResetPasswordProps) => {
  const token = params.token;
  const csrfToken=await getCsrfToken()
  return (
    <div className="w-full">
      <h4 className="text-gray-800 font-bold text-center">
        Reset your password
      </h4>
      <ResetPanel userToken={token} csrfToken={csrfToken}/>
    </div>
  );
};

export default Page;
