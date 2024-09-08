import React from "react";
import { PhotoCard } from "./PhotoCard";
import { deletePhoto, getAllPhotos } from "./actions/cloudinaryActions";
import { UserCloudinaryImage } from "./UserCloudinaryImage";
import { PhotosList } from "./PhotosList";

export const PhotosPage = async () => {
  const photos = await getAllPhotos();
  return (
    <>
      <UserCloudinaryImage />

      <PhotosList photos={photos}/>
    </>
  );
};
