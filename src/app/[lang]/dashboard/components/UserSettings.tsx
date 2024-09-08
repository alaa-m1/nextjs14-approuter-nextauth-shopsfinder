import React from "react";
import { PaginationSettings } from "./UserSettingsComponents";

export const UserSettings = () => {
  return (
    <div className="w-full">
      <h4 className="text-blue-900 font-bold text-center">Settings</h4>

<div className="flex flex-col gap-1">
  <PaginationSettings />
</div>
    </div>
  );
};
