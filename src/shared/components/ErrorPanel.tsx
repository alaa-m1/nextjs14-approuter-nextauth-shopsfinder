import React from "react";
type ErrorPanelProps = {
  btnCallback: () => void;
};
export const ErrorPanel = ({ btnCallback }: ErrorPanelProps) => {
  return (
    <div className="flex w-full">
      <div className="m-auto  shadow-sm by-1 px-5 text-center py-2">
        <h2>The service is currently unavailable! Please try again later</h2>
        <button
          className="border-[1px] border-solid border-gray-600 hover:shadow-sm"
          onClick={
            // Attempt to recover by trying to re-render the segment
            btnCallback
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
};
