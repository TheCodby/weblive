import React from "react";
import LocaleLink from "@/app/[locale]/components/locale-link";
import Image from "next/image";
import { Room } from "@/app/interfaces/room";
import Card from "@/app/[locale]/components/ui/card";
import { FaLock } from "react-icons/fa";
interface Props {
  room: Room;
}

const RoomCard: React.FC<Props> = ({ room }) => {
  return (
    <LocaleLink href={`/rooms/${room.id}`}>
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
            <p className="lg:text-xl text-md font-bold inline-flex items-center gap-2">
              {room.name} {room.type === 1 ? <FaLock /> : null}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </p>
            <p className="text-sm text-gray-500">{room.owner.username}</p>
          </div>
        </div>
        {room.onlineUsers >= 0 ? (
          <div className="lg:flex hidden flex-row gap-4 items-center">
            <p className="text-sm dark:text-gray-300 rounded-full bg-green-500/50 px-5 py-2 font-bold shadow-xl shadow-green-600/20">
              {room.onlineUsers}/{room.capacity}
            </p>
          </div>
        ) : null}
      </Card>
    </LocaleLink>
  );
};

export default RoomCard;
