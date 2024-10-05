import React from "react";
import { UserCard, UserProfile, UserSettings } from "./components";
// import { PhotosPage } from "./components/CloudinaryPhotosList/PhotoPage";
type DashboardProps = {
  searchParams: { p: string };
  params: { lang: string };
};

export const dynamic = "force-dynamic";

const Page = ({ searchParams, params }: DashboardProps) => {
  return (
    <>
      {/* <PhotosPage/> */}
      <br />
      <br />
      <br />
      {!searchParams.p && <UserCard lang={params.lang} />}
      {searchParams.p?.toLocaleLowerCase() === "profile" && <UserProfile />}
      {searchParams.p?.toLocaleLowerCase() === "settings" && <UserSettings />}
    </>
  );
};
export default Page;
