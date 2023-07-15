"use client";
import React from "react";
import Image from "next/image";
import LocaleLink from "./locale-link";
import { motion } from "framer-motion";
import { Room } from "@/app/interfaces/room";
interface Props {
  dict: any;
  rooms: Room[];
}
const TopRooms: React.FC<Props> = ({ dict, rooms }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/50 dark:bg-black/50 h-fit basis-2/5 rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="flex flex-col gap-3 p-5 overflow-hidden">
        <h1 className="font-black text-3xl"> {dict.home.TOP_ROOMS}</h1>
        {rooms?.length > 0
          ? rooms.slice(0, 3).map((room: Room) => (
              <LocaleLink
                key={room.id}
                href={`/rooms/${room.id}`}
                className="flex flex-row gap-4 items-center justify-between border-b-2 dark:border-neutral-900 p-5 hover:dark:bg-neutral-900 hover:bg-neutral-200"
              >
                <div className="flex flex-row gap-4 items-center">
                  <Image
                    quality={100}
                    width={64}
                    height={64}
                    src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${room.owner.avatar}`}
                    className="rounded-full border border-neutral-200 dark:border-neutral-700"
                    alt="Top Room Avatar"
                  />
                  <div className="flex flex-col gap-1 text-start">
                    <p className="text-xl font-bold inline-flex items-center gap-2">
                      {room.name}{" "}
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {room.owner.username}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <p className="text-sm dark:text-gray-300 rounded-full bg-green-500/50 px-5 py-2 font-bold shadow-xl shadow-green-600/20">
                    {room.onlineUsers}/{room.capacity}
                  </p>
                </div>
              </LocaleLink>
            ))
          : null}
      </div>
    </motion.div>
  );
};

export default TopRooms;
