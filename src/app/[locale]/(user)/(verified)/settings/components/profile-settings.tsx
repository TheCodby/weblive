"use client";
import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
import TextInput from "@/app/[locale]/components/ui/text-input";
import Textarea from "@/app/[locale]/components/ui/textarea";
import { User } from "@/app/interfaces/user";
import { getUserTheme } from "@/app/utils/theme";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const ProfileSettings = ({ messages, user }: { messages: any; user: User }) => {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState(user.username);
  const [bio, setBio] = React.useState(user.bio);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: username,
          bio: bio,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast(data.message, {
        type: "success",
        theme: getUserTheme(),
      });
      router.refresh();
    } catch (err: any) {
      toast(err.message, {
        type: "error",
        theme: getUserTheme(),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 justify-start items-start"
    >
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.user.USERNAME}
        </span>
        <TextInput
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          type="text"
        />
        <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs">
          {messages.settings.profile.USERNAME_REQUIRED}
        </p>
      </label>
      <label className="block w-full">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.settings.profile.BIO}
        </span>
        <Textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full dark:bg-neutral-800 mt-1"
          rows={6}
        />
      </label>
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? messages.main.LOADING : messages.main.SAVE_CHANGES}
      </Button>
    </form>
  );
};

export default ProfileSettings;
