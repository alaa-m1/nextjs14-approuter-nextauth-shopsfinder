import Image from "next/image";
import React from "react";

type AdminInfoBar = {
  imgSrc: string | undefined;
  name: string | undefined;
  verticalAlignment?: boolean;
};
export const AdminInfo = ({ imgSrc, name, verticalAlignment = false }: AdminInfoBar) => {
  return (
    <div
      className={`flex flex-wrap gap-1 ${verticalAlignment && "flex-col"} w-full ${
        verticalAlignment ? "justify-center" : "justify-end"
      } overflow-hidden`}
    >
      <div className="place-self-center max-w-[100px] overflow-hidden">
        <span className="text-nowrap text-white place-self-center">
          {name}
        </span>
      </div>
      <Image
        className={`rounded-full bg-white ${
          verticalAlignment ? "w-[50px] h-[50px]" : "w-[40px] h-[40px]"
        } place-self-center hover:shadow-md`}
        width={40}
        height={40}
        src={imgSrc ?? "/images/user-icon.png"}
        alt={`${name ?? "user"} image`}
      />
    </div>
  );
};
