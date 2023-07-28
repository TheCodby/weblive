import { Room } from "@/app/interfaces/room";
import React from "react";
import Loading from "../loading";
import { useQuery } from "@tanstack/react-query";
import LocaleLink from "../locale-link";
import Image from "next/image";
interface Props {
  fetcher: () => Promise<{ rooms: Room[] }>;
}
const RoomsList: React.FC<Props> = ({ fetcher }) => {
  const query = useQuery(["rooms", 1], fetcher, {
    refetchInterval: 10000,
  });
  if (query.isLoading) return <Loading />;
  if (query.error) {
    throw query.error;
  }
  return (
    <div className="flex flex-col gap-3 overflow-y-auto p-2 shadow-lg">
      {query.data!.rooms.length > 0 ? (
        query.data?.rooms.map((room: Room) => (
          <LocaleLink href={`/rooms/${room.id}`} key={room.id}>
            <div className="flex flex-row items-center gap-2 w-full hover:dark:bg-neutral-800 hover:bg-neutral-200 p-3 rounded-lg">
              <div className="w-8 h-8 relative overflow-hidden">
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
              <div className="flex flex-col gap-2 items-start">
                <p className="text-sm font-medium inline-flex items-center gap-2">
                  {room.name}

                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </p>
                <p className="text-xs text-neutral-400">
                  {room.onlineUsers}/{room.capacity}
                </p>
              </div>
            </div>
          </LocaleLink>
        ))
      ) : (
        <p>No rooms found.</p>
      )}
    </div>
  );
};

export default RoomsList;
