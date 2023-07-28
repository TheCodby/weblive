import React from "react";
import Image from "next/image";
import LocaleLink from "./locale-link";
import { Room } from "@/app/interfaces/room";
import Card from "./ui/card";
import RoomCard from "../(user)/rooms/components/room-card";
interface Props {
  rooms: Room[];
}
const RoomsGrid: React.FC<Props> = ({ rooms }) => {
  if (!rooms || rooms?.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <p className="text-xl font-bold inline-flex items-center gap-2">
          No Rooms Found
        </p>
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {rooms.map((room: Room) => (
        <RoomCard room={room} key={room.id} />
      ))}
    </div>
  );
};

export default RoomsGrid;
