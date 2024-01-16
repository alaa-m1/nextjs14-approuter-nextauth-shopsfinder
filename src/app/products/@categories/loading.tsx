import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Loading = () => {
  return (
    <div className="mx-16">
      <Skeleton className="h-[15px] m-1" />
    </div>
  );
};
export default Loading;
