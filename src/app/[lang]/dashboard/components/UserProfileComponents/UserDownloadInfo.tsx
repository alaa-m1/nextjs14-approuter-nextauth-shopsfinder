"use client";
import { useUserInfo } from "@/shared";
import { mapUserInfo } from "@/utils/helpers";
import React from "react";
import { BsCardImage } from "react-icons/bs";
import { BsJournalArrowDown } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";

export const UserDownloadInfo = () => {
  const { userInfo } = useUserInfo();

  const handleDownloadInfo = () => {
    const link = document.createElement("a");
    link.download = `${userInfo.firstName} ${userInfo.lastName} - information.txt`;
    const bolbpart = mapUserInfo(userInfo);
    const userBolb = new Blob([bolbpart.join("")], { type: "text/plain" });
    link.href = URL.createObjectURL(userBolb);
    link.click();
    URL.revokeObjectURL(link.href);
  };
  
  const handleShowPhoto = () => {
    const link = document.createElement("a");
    link.href = userInfo.image.imgURL as string;
    link.target="_blank"
    link.rel="noopener noreferrer"
    link.click();
  };

  const handleDownloadPhoto = async () => {
    const nameOfDownload = `${userInfo.firstName} ${userInfo.lastName} - photo.jpg`;
    const response = await fetch(userInfo.image.imgURL as string);

    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };
  return (
    <fieldset className="fieldset-border p-2">
      <legend>Download user information</legend>
      <div className="flex flex-wrap gap-5">
        <button
          onClick={() => handleDownloadInfo()}
          className="text-blue-700 hover:underline"
        >
          <div className="flex flex-wrap gap-1">
            <BsJournalArrowDown className="place-self-center" />
            &nbsp;Download profile information
          </div>
        </button>
        <div></div>
        <button
          onClick={() => handleShowPhoto()}
          className="text-blue-700 hover:underline"
        >
          <div className="flex flex-wrap gap-1">
            <BsCardImage className="place-self-center" />
            &nbsp;Show profile photo
          </div>
        </button>
        <button
          onClick={() => handleDownloadPhoto()}
          className="text-blue-700 hover:underline"
        >
          <div className="flex flex-wrap gap-1">
            <BsDownload className="place-self-center" />
            &nbsp;Download profile photo
          </div>
        </button>
      </div>
    </fieldset>
  );
};
