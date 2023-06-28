import React from "react";
import LocaleLink from "../../../components/locale-link";
import { FaLock } from "react-icons/fa";
import Image from "next/image";
interface Room {
  id: number;
  name: string;
  capacity: number;
  owner: {
    username: string;
    avatar: string;
  };
  type: number;
}
interface Props {
  roomData: Room;
}

const RoomCard: React.FC<Props> = ({ roomData }) => {
  return (
    <LocaleLink href={`/rooms/${roomData.id}`}>
      <div className="card flex flex-col p-4 justify-between hover:bg-neutral-300 hover:dark:bg-neutral-800">
        <h1 className="text-2xl font-black inline-flex gap-2 items-center">
          {roomData.name} {roomData.type === 1 ? <FaLock /> : null}
        </h1>
        <div className="flex flex-row justify-between">
          <p className="text-sm">Online: 1/{roomData.capacity}</p>
          <p className="text-md inline-flex items-center gap-3">
            {roomData.owner.username}
            <div className="w-8 h-8 overflow-hidden relative">
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_API}${roomData.owner.avatar}`}
                className="rounded-full border border-neutral-200 dark:border-neutral-700"
                alt=""
              />
            </div>
          </p>
        </div>
      </div>
    </LocaleLink>
  );
};

export default RoomCard;
