"use client";
import React from "react";
import { motion } from "framer-motion";
import { Room } from "@/app/interfaces/room";
import RoomsGrid from "./rooms-grid";
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
    >
      <h1 className="font-black text-3xl mb-2"> {dict.home.TOP_ROOMS}</h1>
      <RoomsGrid rooms={rooms.slice(0, 6)} />
    </motion.div>
  );
};

export default TopRooms;
