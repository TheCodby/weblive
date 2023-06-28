import { Room } from "@/app/interfaces/room";
import { getRoom } from "@/app/utils/server/room";
import React from "react";
import Chat from "../../components/chat";
import LiveBox from "../../components/live-box";
import { getDictionary } from "@/dictionaries";
import RoomPassword from "../components/room-password";
import { Metadata } from "next";
interface Props {
  params: { locale: string; id: string };
  children: React.ReactNode;
  room: React.ReactNode;
  password: React.ReactNode;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const [dict, room]: [any, Room] = await Promise.all([
    getDictionary(params.locale),
    getRoom(params.id),
  ]);
  if (room)
    return {
      title: room.name,
    };
  return {
    title: dict.join_room.TITLE,
  };
}
const RoomPage = async ({ params }: Props) => {
  // if user not joined the room before, ask for password
  const [dict, room]: [any, Room] = await Promise.all([
    getDictionary(params.locale),
    getRoom(params.id),
  ]);
  if (!room)
    return (
      <div className="flex flex-row items-center justify-center">
        <RoomPassword messages={dict} />
      </div>
    );
  return (
    <div className="flex flex-row gap-10 p-6 items-start">
      <Chat messages={dict} room={room} />
      <LiveBox messages={dict} room={room} />
    </div>
  );
};

export default RoomPage;
