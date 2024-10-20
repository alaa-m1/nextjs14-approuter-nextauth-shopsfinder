import React from "react";
import { getAllPhotos } from "./actions/cloudinaryActions";
import { UserCloudinaryImage } from "./UserCloudinaryImage";
import { PhotosList } from "./PhotosList";

export const PhotosPage = async () => {
  const photos = await getAllPhotos();
  return (
    <div>
      <UserCloudinaryImage />

      <PhotosList photos={photos} />
    </div>
  );
};
