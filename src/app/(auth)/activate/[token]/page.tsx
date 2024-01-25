import React from "react";
import Link from "next/link";
import { Alert } from "@/shared";
import { activateAccount } from "@/utils/authentication/activateAccount";

type ActivateProps = {
  params: { token: string };
};
const Page = async ({ params }: ActivateProps) => {
  const token = params.token;
  const response = await activateAccount(token);
  const messageItem = (
    <div className="text-center w-full text-lg">{response.message}</div>
  );
  return (
    <>
      {response.message && (
        <div className="flex flex-col items-center justify-center gap-5 w-[500px] mt-[50px] mx-auto shadow-md m-4 p-4">
          {response.status === 500 && (
            <Alert severity="error">{messageItem}</Alert>
          )}
          {response.status === 400 && (
            <Alert severity="info">{messageItem}</Alert>
          )}
          {response.status === 200 && (
            <Alert severity="success">{messageItem}</Alert>
          )}
          <Link href="/signin" className="font-bold">
            SIGN IN
          </Link>
        </div>
      )}
    </>
  );
};

export default Page;
