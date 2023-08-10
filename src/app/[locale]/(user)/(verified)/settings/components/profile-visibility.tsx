"use client";
import { Switch } from "@/app/[locale]/components/ui/switch";
import { Label } from "@/app/[locale]/components/ui/label";
import React from "react";
import { Eye } from "lucide-react";

const ProfileVisibility = () => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div className="flex flex-row items-center justify-between p-3">
      <div className="flex flex-row gap-3 items-center">
        <Eye size={36} />
        <div className="flex flex-col gap-3">
          <Label>Public Profile</Label>
          <Label className="text-gray-400">
            Your profile will be visible to everyone
          </Label>
        </div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        id="profile-visiblity"
      />
    </div>
  );
};

export default ProfileVisibility;
