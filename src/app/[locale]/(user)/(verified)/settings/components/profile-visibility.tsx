"use client";
import { Switch } from "@headlessui/react";
import React from "react";

const ProfileVisibility = () => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div className="inline-flex gap-3">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-blue-600" : "bg-neutral-300 dark:bg-neutral-700"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Public Profile</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <p className="text-md">Public Profile</p>
    </div>
  );
};

export default ProfileVisibility;
