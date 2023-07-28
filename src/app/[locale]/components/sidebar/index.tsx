"use client";
import { User } from "@/app/interfaces/user";
import React from "react";
import { getRooms } from "@/app/utils/room";
import RoomsList from "./rooms-list";
import { GoSidebarExpand } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/button";
const Sidebar = ({ user, locale }: { user: User; locale: string }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  return (
    <div className="relative z-[9]">
      <div
        className={`h-full dark:bg-neutral-900 ${
          showSidebar ? "w-64" : "w-14"
        } bg-white lg:flex flex-col hidden overflow-hidden py-3 px-4 transition-all`}
      >
        <div
          className={`flex flex-col gap-2 mb-2 ${
            !showSidebar ? "justify-center" : ""
          } w-full`}
        >
          <button
            className="text-xl font-bold"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <GoSidebarExpand
              className={`transition ${
                !showSidebar ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              className="overflow-y-auto"
            >
              <p className="text-xl font-bold">Rooms</p>
              <RoomsList fetcher={() => getRooms("1")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Sidebar;
