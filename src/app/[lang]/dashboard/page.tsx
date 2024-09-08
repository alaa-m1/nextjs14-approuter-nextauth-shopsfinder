import React from "react";
import { UserCard, UserProfile, UserSettings } from "./components";
import { UserCloudinaryImage } from "./components/CloudinaryPhotosList/UserCloudinaryImage";
import { PhotosPage } from "./components/CloudinaryPhotosList/PhotoPage";
type DashboardProps = {
  searchParams: { p: string };
};
const Page = ({ searchParams }: DashboardProps) => {
  return (
    <>
    <PhotosPage/>
    <br />
    <br />
    <br />
      {!searchParams.p && <UserCard />}
      {searchParams.p?.toLocaleLowerCase() === "profile" && <UserProfile />}
      {searchParams.p?.toLocaleLowerCase() === "settings" && <UserSettings />}
    </>
  );
};
export default Page;
