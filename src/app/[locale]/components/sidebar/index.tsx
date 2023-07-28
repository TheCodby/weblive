"use client";
import { User } from "@/app/interfaces/user";
import React from "react";
import { getRooms } from "@/app/utils/room";
import RoomsList from "./rooms-list";

const Sidebar = ({ user, locale }: { user: User; locale: string }) => {
  return (
    <div className="relative z-[9]">
      <div className="h-full w-64 dark:bg-neutral-900 bg-white lg:flex flex-col hidden">
        <p className="text-xl font-bold px-4">Rooms</p>
        <RoomsList fetcher={() => getRooms("1")} />
      </div>
    </div>
  );
};

export default Sidebar;
