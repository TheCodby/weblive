import React from "react";
import Image from "next/image";
import LocaleLink from "./locale-link";
import { Room } from "@/app/interfaces/room";
import Card from "./ui/card";
interface Props {
  rooms: Room[];
}
const RoomsGrid: React.FC<Props> = ({ rooms }) => {
  if (!rooms || rooms?.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-xl font-bold inline-flex items-center gap-2">
          No Rooms Found
        </p>
      </div>
    );
  }
  return rooms.map((room: Room) => (
    <LocaleLink key={room.id} href={`/rooms/${room.id}`} className="">
      <Card className="flex flex-row gap-4 items-center justify-between border-b-2 dark:border-neutral-900 p-5 hover:dark:bg-neutral-800 hover:bg-neutral-200">
        <div className="flex flex-row gap-4 items-center">
          <div className="w-16 h-16 relative overflow-hidden">
            <Image
              style={{
                objectFit: "cover",
              }}
              quality={100}
              fill
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${room.owner.avatar}`}
              className="rounded-full border border-neutral-200 dark:border-neutral-700"
              alt="Top Room Avatar"
            />
          </div>
          <div className="flex flex-col gap-1 text-start">
            <p className="text-xl font-bold inline-flex items-center gap-2">
              {room.name}{" "}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </p>
            <p className="text-sm text-gray-500">{room.owner.username}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <p className="text-sm dark:text-gray-300 rounded-full bg-green-500/50 px-5 py-2 font-bold shadow-xl shadow-green-600/20">
            {room.onlineUsers}/{room.capacity}
          </p>
        </div>
      </Card>
    </LocaleLink>
  ));
};

export default RoomsGrid;
