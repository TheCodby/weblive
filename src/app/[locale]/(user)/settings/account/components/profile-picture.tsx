"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfilePicture = ({ messages, user }: { messages: any; user: any }) => {
  return (
    <div className="card md:w-1/2 flex flex-col items-center md:flex-row gap-3 p-5">
      <FaUserCircle size={128} />
      <div className="text-md flex flex-col md:flex-row justify-between items-center w-full gap-3">
        <div>
          <p className="dark:text-neutral-100">
            {messages.settings.account.UPLOAD_PICTURE_DESCRIPTION}
          </p>
          <p className="dark:text-neutral-300 text-sm">
            {messages.settings.account.PIRCTURE_FORMATS}
          </p>
        </div>
        <button className="btn mb-3 dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-300 text-black dark:text-white shadow-none">
          {messages.settings.account.UPLOAD_PICTURE}
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
