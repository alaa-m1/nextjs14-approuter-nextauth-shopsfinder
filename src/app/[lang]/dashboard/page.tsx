import React from "react";
import { UserCard, UserProfile, UserSettings } from "./components";
import { PhotosPage } from "./components/CloudinaryPhotosList/PhotoPage";
type DashboardProps = {
  searchParams: { p: string };
};

export const dynamic = 'force-dynamic'

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
