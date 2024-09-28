"use client";
import React from "react";
import { PhotoCard } from "./PhotoCard";
import { deletePhoto } from "./actions/cloudinaryActions";
import { isArray } from "lodash";

export const PhotosList = ({ photos }: { photos: any }) => {

  const handleDeletePhoto = async (publicId: string) => {
    await deletePhoto(publicId);
  };
  return (
    <div className="flex flex-wrap gap-1">
      {(isArray(photos) ? photos : []).map((photo: any) => (
        <PhotoCard
          key={photo?.public_id}
          secure_url={photo?.secure_url ?? ""}
          onDeletePhoto={() => handleDeletePhoto(photo?.public_id ?? "")}
        />
      ))}
    </div>
  );
};
