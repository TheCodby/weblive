"use client";
import { Switch } from "@/app/[locale]/components/ui/switch";
import { Label } from "@/app/[locale]/components/ui/label";
import React from "react";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";

interface Props {
  isPublic: boolean;
}
const ProfileVisibility: React.FC<Props> = ({ isPublic }) => {
  const [enabled, setEnabled] = React.useState(isPublic);
  const handleChange = async (value: boolean) => {
    console.log(value);
    setEnabled(value);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/me/profile-visibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setEnabled(data.public);
      toast(data.message, {
        type: "success",
        theme: getUserTheme(),
      });
    } catch (err: any) {
      toast(err.message, {
        type: "error",
        theme: getUserTheme(),
      });
    }
  };

  return (
    <div className="flex flex-row items-center justify-between p-3">
      <div className="flex flex-row gap-3 items-center">
        <div className="p-2 bg-neutral-800 rounded-full">
          <Eye size={36} color="#ffffff" />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Public Profile</Label>
          <Label className="text-gray-400">
            Your profile will be visible to everyone
          </Label>
        </div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={handleChange}
        id="profile-visiblity"
      />
    </div>
  );
};

export default ProfileVisibility;
