import { LoadingSpinner } from "@/shared";
import Link from "next/link";
import React from "react";

type AdminLogoProps = {
  imgSrc: string | undefined;
  name: string | undefined;
  verticalAlignment?: boolean;
  isLoading: boolean;
};
export const AdminLogo = ({
  imgSrc,
  name,
  verticalAlignment = false,
  isLoading,
}: AdminLogoProps) => {
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div
      className={`flex flex-wrap gap-1 ${
        verticalAlignment && "flex-col"
      } w-full ${
        verticalAlignment ? "justify-center" : "justify-end"
      } overflow-hidden`}
    >
      <div className="place-self-center overflow-hidden max-w-[200px]">
        <span className="text-nowrap text-blue-200 place-self-center">
          <Link className="" href={`/dashboard`}>
            {name}
          </Link>
        </span>
      </div>
      <img
        className={`rounded-full ${
          verticalAlignment ? "w-[50px] h-[50px]" : "w-[40px] h-[40px]"
        } place-self-center hover:shadow-md`}
        src={imgSrc || "/images/user-icon.png"}
        alt={`${name || "user"}`}
      />
    </div>
  );
};
