"use client";
import React, { useTransition } from "react";

export const PhotoCard = ({
  secure_url,
  onDeletePhoto,
}: {
  secure_url: string;
  onDeletePhoto: any;
}) => {
  console.log("secure_ur=", secure_url);
  const [isPending, startTransition]=useTransition()
  return (
    <div>
      <img src={secure_url} className="h-[200px] aspect-auto " />
      <button onClick={() => startTransition(()=>onDeletePhoto())} disabled={isPending}>{isPending?"loading":"delete"}</button>
    </div>
  );
};
