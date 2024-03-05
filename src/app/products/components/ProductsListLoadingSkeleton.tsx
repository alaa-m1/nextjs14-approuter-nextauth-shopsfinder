import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import _ from "lodash";
const GRID_ITEMS_COUNT = 10;
export const ProductsListLoadingSkeleton = () => {
  const gridItemsArray = useMemo(
    () =>
      Array(GRID_ITEMS_COUNT)
        .fill(0)
        .map((item) => ({ label: item, id: _.uniqueId() })),
    []
  );
  return (
    <div>
      <div className="grid gap-5 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-[10px]">
        {gridItemsArray.map((item) => (
          <div key={item.id} className="w-[300px] h-[350px]">
            <Skeleton style={{ width: "100%", height: "100%" }}/>
          </div>
        ))}
      </div>
      <Skeleton style={{ height: "25px" }} />
    </div>
  );
};
