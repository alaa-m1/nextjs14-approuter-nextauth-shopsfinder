"use client";
import { LoadingSpinner, useUserInfo } from "@/shared";
import Link from "next/link";
import React from "react";
export const UserCard = () => {
  const { userInfo, status } = useUserInfo();
  return status === "loading" ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col items-center w-full h-full rounded-lg mt-2">
      <img
        className="w-[250px] aspect-auto min-h-[100px] max-h-[250px] bg-white rounded-t-lg hover:scale-105 hover:opacity-80 transition-all duration-700 "
        src={userInfo.image.imgURL}
        alt={`${userInfo.firstName + " " + userInfo.lastName}`}
      />
      <div className="p-5 flex-grow">
        <h5 className="h-[20px] overflow-hidden text-nowrap text-ellipsis mb-2 text-xl font-medium leading-tight text-gray-700">
          {userInfo.firstName + " " + userInfo.lastName}
        </h5>
        <div>
          <p className=" mb-4 text-base text-neutral-500 ">
            Email: {userInfo.email}
          </p>
          <p className=" mb-4 text-base text-neutral-500 ">
            Address: {userInfo.address}
          </p>
          <p className=" mb-4 text-base text-neutral-500 ">
            Mobile:{userInfo.mobile}
          </p>
        </div>
        <div className="mt-2 text-center">
          <Link
            className="border-solid border-2 border-gray-500 rounded-md p-1 hover:shadow-md"
            href={`/dashboard?p=profile`}
          >
            Edit User Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
