import type { Room } from "@/app/interfaces/room";
import { getRoom } from "@/app/utils/server/room";
import React from "react";
import { getDictionary } from "@/dictionaries";
import RoomPassword from "../components/room-password";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getUserByToken } from "@/app/utils/user";
import LiveViewer from "../../components/live-viewer";
import PageWrapper from "@/app/[locale]/components/page-wrapper";
interface Props {
  params: { locale: string; id: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
  const user: any = getUserByToken(cookies().get("token")?.value.toString()!);
  if (!room)
    return (
      <div className="flex flex-row items-center justify-center">
        <RoomPassword messages={dict} />
      </div>
    );
  return (
    <PageWrapper className="flex flex-col md:flex-row gap-10 p-6 absolute items-start h-full w-full">
      <LiveViewer dict={dict} room={room} user={user} />
    </PageWrapper>
  );
};

export default RoomPage;
