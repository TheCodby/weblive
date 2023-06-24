"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
const AccountSettings = ({ messages }: { messages: string[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <dl className="flex flex-col gap-2">
        <dt className="text-2xl dark:text-neutral-100 text-neutral-800">
          Profile Picture
        </dt>
        <dd className="card w-1/2 flex flex-row gap-3 p-5">
          <FaUserCircle size={128} />
          <div className="text-md flex flex-row justify-between items-center w-full">
            <div>
              <p className="dark:text-neutral-100">
                Upload a new profile picture
              </p>
              <p className="dark:text-neutral-300 text-sm">
                JPG, GIF or PNG 100x100px
              </p>
            </div>
            <button className="btn mb-3 dark:bg-neutral-800 bg-neutral-300 text-black dark:text-white shadow-none">
              Upload Picture
            </button>
          </div>
        </dd>
      </dl>
    </div>
  );
};

export default AccountSettings;
