import Card from "@/app/[locale]/components/ui/card";
import { Room } from "@/app/interfaces/room";
import React from "react";
import FollowButton from "../../../components/follow-button";
import Image from "next/image";
interface Props {
  room: Room;
}
const RoomInfo: React.FC<Props> = ({ room }) => {
  return (
    <Card className="flex flex-col justify-center gap-3 p-4">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 relative overflow-hidden">
            <Image
              fill
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${room.owner.avatar}`}
              alt=""
            />
          </div>
          <p>{room.owner.username}</p>
        </div>
        <FollowButton
          userId={room.ownerId!}
          isFollowing={room.owner.isFollowing}
        />
      </div>
    </Card>
  );
};

export default RoomInfo;
