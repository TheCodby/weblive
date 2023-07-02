import { getDictionary } from "@/dictionaries";
import React from "react";
import PageWrapper from "./components/page-wrapper";
import { pangolin } from "../fonts";
import RoomCard from "./(user)/rooms/components/room-card";
import { getRooms } from "../utils/server/room";
import { Room } from "../interfaces/room";
import Image from "next/image";
import Link from "next/link";
import LocaleLink from "./components/locale-link";

const HomePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const [dict, rooms]: [rooms: Room[], dict: any] = await Promise.all([
    getDictionary(locale),
    getRooms(),
  ]);

  return (
    <PageWrapper className="p-24 flex flex-row text-center h-full justify-between">
      <div className="rounded-3xl basis-2/5 flex flex-col text-start gap-6">
        <p className="text-5xl font-black tracking-tighter">
          Unleash Your Gaming Prowess and Dive into Captivating Podcasts
        </p>
        <p className={`text-xl font-medium text-justify`}>
          Experience the thrill of live gaming and immerse yourself in
          captivating podcasts on WebLive. Join now for endless entertainment in
          one place.
        </p>
      </div>
      <div className="bg-black/50 h-fit basis-2/5 rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col gap-5 p-5 overflow-hidden">
          <h1 className="font-black text-3xl">Top Rooms</h1>
          {rooms.slice(0, 3).map((room: Room) => (
            <LocaleLink
              key={room.id}
              href={`/rooms/${room.id}`}
              className="flex flex-row gap-4 items-center justify-between border-b-2 dark:border-neutral-900 p-5"
            >
              <div className="flex flex-row gap-4 items-center">
                <div className="w-16 h-16 overflow-hidden relative">
                  <Image
                    fill
                    src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${room.owner.avatar}`}
                    className="rounded-full border border-neutral-200 dark:border-neutral-700"
                    alt=""
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
                <p className="text-sm text-gray-300 rounded-full bg-green-500/50 px-5 py-2 font-bold shadow-xl shadow-green-600/20">
                  {room.onlineUsers}/{room.capacity}
                </p>
              </div>
            </LocaleLink>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
