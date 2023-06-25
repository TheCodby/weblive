"use client";
import React from "react";

const ProfileSettings = ({ messages, user }: { messages: any; user: any }) => {
  return (
    <div className="md:w-1/2 flex flex-col gap-3 card p-5 justify-start items-start">
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.user.USERNAME}
        </span>
        <input
          defaultValue={user.username}
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
          className="w-full dark:bg-neutral-800 mt-1"
          rows={6}
        ></textarea>
      </label>
      <button className="btn dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-300 text-black dark:text-white shadow-none self-center">
        {messages.main.SAVE_CHANGES}
      </button>
    </div>
  );
};

export default ProfileSettings;
