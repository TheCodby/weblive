"use client";
import React from "react";
import { Room } from "@/app/interfaces/room";

interface Props {
  messages: any;
  room: Room;
}
const LiveBox: React.FC<Props> = ({ messages, room }) => {
  return <div className="card w-full md:order-2 h-96 p-3">LiveBox</div>;
};

export default LiveBox;
