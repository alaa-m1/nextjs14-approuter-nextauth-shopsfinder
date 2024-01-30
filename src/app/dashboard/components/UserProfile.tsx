"use client";
import React from "react";
import { UserGeneralInfo, UserPassword } from "./UserProfileComponents";
import { LoadingSpinner, useUserInfo } from "@/shared";

export const UserProfile = () => {
  const { userInfo, status } = useUserInfo();
  return (
    <div className="w-full">
      <h4 className="text-blue-900 font-bold text-center">User Profile</h4>
      {status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <>
          <UserGeneralInfo userInfo={userInfo} />
          <UserPassword userInfo={userInfo} />
        </>
      )}
    </div>
  );
};
