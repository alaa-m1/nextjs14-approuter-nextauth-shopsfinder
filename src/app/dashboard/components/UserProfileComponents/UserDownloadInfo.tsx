"use client";
import { useUserInfo } from "@/shared";
import { mapUserInfo } from "@/utils/helpers";
import React from "react";
import { BsCardImage } from "react-icons/bs";
import { BsJournalArrowDown } from "react-icons/bs";

export const UserDownloadInfo = () => {
  const { userInfo } = useUserInfo();
  //   const aRef = useRef<HTMLAnchorElement>(null);
  //   useEffect(() => {
  //     // console.log("useEffect run ......");
  //     if (aRef.current) {
  //       const bolbpart = mapUserInfo(userInfo);

  //       const userBolb = new Blob([bolbpart.join("")], { type: "text/plain" });
  //       aRef.current.href = URL.createObjectURL(userBolb);
  //     }
  //   }, [userInfo]);
  const handleDownloadInfo = () => {
    const link = document.createElement("a");
    link.download = `${userInfo.firstName} ${userInfo.lastName} - information.txt`;
    const bolbpart = mapUserInfo(userInfo);
    const userBolb = new Blob([bolbpart.join("")], { type: "text/plain" });
    link.href = URL.createObjectURL(userBolb);

    link.click();

    URL.revokeObjectURL(link.href);
  };
  const handleDownloadPhoto = () => {
    const link = document.createElement("a");
    link.download = `${userInfo.firstName} ${userInfo.lastName} - photo.jpg`;
    link.href = userInfo.image.imgURL;

    link.click();

    URL.revokeObjectURL(link.href);
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
            <BsJournalArrowDown className="place-self-center"/>
            &nbsp;Download profile information
          </div>
        </button>
        <button
          onClick={() => handleDownloadPhoto()}
          className="text-blue-700 hover:underline"
        >
          <div className="flex flex-wrap gap-1">
            <BsCardImage className="place-self-center"/>
            &nbsp;Download profile photo
          </div>
        </button>
      </div>
      {/* <a
        download={`${userInfo.firstName} ${userInfo.lastName} - information.txt`}
        href="#"
        id="link"
        ref={aRef}
        className="text-blue-700 hover:underline"
      >
        Download information
      </a> */}
    </fieldset>
  );
};
