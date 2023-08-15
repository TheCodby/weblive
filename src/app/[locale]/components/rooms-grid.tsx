import React from "react";
import { Room } from "@/app/interfaces/room";
import RoomCard from "./room-card";
interface Props {
  rooms: Room[];
  owner?: {
    username: string;
    avatar: string;
  };
}
const RoomsGrid: React.FC<Props> = ({ rooms, owner }) => {
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
        <RoomCard room={room} owner={owner || room.owner} key={room.id} />
      ))}
    </div>
  );
};

export default RoomsGrid;
