import React, { HTMLAttributes } from "react";
import { GridLoader } from "react-spinners";

const LoadingSpinner = ({
  floatingOver,
  size = 20,
}: {
  floatingOver?: boolean;
  size?: number;
}) => {
  const floatingOverStyle: HTMLAttributes<HTMLDivElement>['className'] =
    floatingOver
      ? "fixed l-[50vh] t-[50vh] translate-x-[50%] translate-y-[50%]"
      : "";
  return (
    <div className={`flex justify-center ${floatingOverStyle}`}>
      <GridLoader color="rgba(54, 126, 214, 1)" size={size} />
    </div>
  );
};

export { LoadingSpinner };
