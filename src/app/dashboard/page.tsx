import React from "react";
import { UserCard, UserProfile, UserSettings } from "./components";
type DashboardProps = {
  searchParams: { p: string };
};
const Page = ({ searchParams }: DashboardProps) => {
  return (
    <>
      {!searchParams.p && <UserCard />}
      {searchParams.p?.toLocaleLowerCase() === "profile" && <UserProfile />}
      {searchParams.p?.toLocaleLowerCase() === "settings" && <UserSettings />}
    </>
  );
};
export default Page;
