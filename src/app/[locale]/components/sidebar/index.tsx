"use client";
import { User } from "@/app/interfaces/user";
import React from "react";
import { getRooms } from "@/app/utils/room";
import RoomsList from "./rooms-list";
import { GoSidebarExpand } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}
const Sidebar = ({ user, locale }: { user: User; locale: string }) => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    setIsMobile(detectMob());
  }, []);
  if (isMobile) return null;
  return (
    <div className="relative z-[9] lg:block hidden">
      <div
        className={`h-full dark:bg-neutral-900 ${
          showSidebar ? "w-64" : "w-14"
        } bg-white flex flex-col overflow-hidden py-3 px-4 transition-all`}
      >
        <div
          className={`flex flex-col gap-2 mb-2 ${
            !showSidebar ? "justify-center" : ""
          } w-full`}
        >
          <div>
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
