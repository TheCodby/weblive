import React from "react";
import LocaleLink from "../../../components/locale-link";
import { FaLock } from "react-icons/fa";
import Image from "next/image";
import { Room } from "@/app/interfaces/room";
import Card from "@/app/[locale]/components/ui/card";
interface Props {
  roomData: Room;
}

const RoomCard: React.FC<Props> = ({ roomData }) => {
  return (
    <LocaleLink href={`/rooms/${roomData.id}`}>
      <Card className="flex flex-col p-4 justify-between hover:bg-neutral-300 hover:dark:bg-neutral-800">
        <h1 className="text-2xl font-black inline-flex gap-2 items-center">
          {roomData.name} {roomData.type === 1 ? <FaLock /> : null}
        </h1>
        <div className="flex flex-row justify-between">
          <p className="text-sm">
            Online: {roomData.onlineUsers}/{roomData.capacity}
          </p>
          <div className="text-md inline-flex items-center gap-3">
            {roomData.owner.username}
            <div className="w-8 h-8 overflow-hidden relative">
              <Image
                fill
                src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${roomData.owner.avatar}`}
                className="rounded-full border border-neutral-200 dark:border-neutral-700"
                alt=""
              />
            </div>
          </div>
        </div>
      </Card>
    </LocaleLink>
  );
};

export default RoomCard;
