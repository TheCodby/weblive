"use client";
import Button from "@/app/[locale]/components/ui/button";
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
      toast.success(data.message, {
        theme: getUserTheme(),
      });
      router.refresh();
    } catch (err: any) {
      toast.error(err.message, {
        theme: getUserTheme(),
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-1/2 flex flex-col gap-3 card p-5 justify-start items-start"
    >
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.user.USERNAME}
        </span>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          className="input dark:bg-neutral-800 dark:text-neutral-100 mt-1 peer invalid:border-red-500"
          type="text"
        />
        <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs">
          {messages.settings.account.USERNAME_REQUIRED}
        </p>
      </label>
      <label className="block w-full">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.settings.account.BIO}
        </span>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full dark:bg-neutral-800 mt-1"
          rows={6}
        ></textarea>
      </label>
      <Button
        type="submit"
        className="btn dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-300 text-black dark:text-white shadow-none self-center"
      >
        {isLoading ? messages.main.LOADING : messages.main.SAVE_CHANGES}
      </Button>
    </form>
  );
};

export default ProfileSettings;
