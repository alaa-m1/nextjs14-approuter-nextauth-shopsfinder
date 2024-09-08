import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export const LoadingContent = () => {
  return (
    <div>
      <Skeleton style={{ height: "50px", margin: "10px 0px 20px" }} />
      <Skeleton style={{ height: "75vh" }} />
    </div>
  );
};
