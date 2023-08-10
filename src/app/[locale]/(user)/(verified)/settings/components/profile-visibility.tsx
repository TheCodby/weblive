"use client";
import { Switch } from "@/app/[locale]/components/ui/switch";
import { Label } from "@/app/[locale]/components/ui/label";
import React from "react";
import Card from "@/app/[locale]/components/ui/card";

const ProfileVisibility = () => {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <Card className="flex flex-row items-center justify-between p-3">
      <div className="space-y-0.5 flex flex-col gap-3">
        <Label>Public Profile</Label>
        <Label className="text-gray-400">
          Your profile will be visible to everyone
        </Label>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        id="profile-visiblity"
      />
    </Card>
  );
};

export default ProfileVisibility;
