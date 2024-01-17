"use client";
import React from "react";
type AlertProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  severity: "success" | "info" | "warning" | "error";
  subLabel?: string;
  children: React.ReactNode;
};
export const Alert = ({ severity, subLabel, children }: AlertProps) => {
  const alertColor =
    severity === "success"
      ? "#2E7D32"
      : severity === "error"
      ? "#D32F2F"
      : severity === "info"
      ? "#0288D1"
      : severity === "warning"
      ? "#ED6C02"
      : "#000";
  console.log("alertColor=", alertColor);
  return (
    <div style={{backgroundColor:alertColor}} className={`py-2 lg:px-2 w-[95%] rounded-lg`}>
      <div style={{backgroundColor:alertColor}}
        className={`px-2 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex`}
        role="alert"
      >
        {subLabel && (
          <span style={{backgroundColor:alertColor}}
            className={`flex rounded-full border-[1px] border-gray-600 mr-3 uppercase py-1 px-2 text-xs font-bold`}
          >
            {subLabel}
          </span>
        )}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};
