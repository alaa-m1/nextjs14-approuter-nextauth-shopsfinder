"use client";
import React from "react";
import { UserGeneralInfo, UserProfilePhoto, UserPassword } from "./UserProfileComponents";
import { LoadingSpinner, useUserInfo } from "@/shared";

export const UserProfile = () => {
  const { userInfo, status } = useUserInfo();
  return (
    <div className="w-full">
      <h4 className="text-blue-900 font-bold text-center">User Profile</h4>
      {status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col gap-1">
          <UserGeneralInfo userInfo={userInfo} />
          <UserProfilePhoto userInfo={userInfo} />
          <UserPassword userInfo={userInfo} />
        </div>
      )}
    </div>
  );
};
