import React from "react";
import { ResetPanel } from "./component";

type ResetPasswordProps = {
  params: { token: string };
};
const Page = async ({ params }: ResetPasswordProps) => {
  const token = params.token;

  return (
    <div className="w-full">
      <h4 className="text-gray-800 font-bold text-center">
        Reset your password
      </h4>
      <ResetPanel token={token} />
    </div>
  );
};

export default Page;
