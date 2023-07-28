import { getRoom } from "@/app/utils/room";
import React from "react";
import { getDictionary } from "@/dictionaries";
import { getMyProfile, getUserToken } from "@/app/utils/server/user";
import LiveViewer from "./components/live-viewer";
import PageWrapper from "@/app/[locale]/components/page-wrapper";
import LocaleLink from "@/app/[locale]/components/locale-link";
import { AiFillCaretLeft } from "react-icons/ai";
import RoomPassword from "../components/room-password";
import { Metadata } from "next";
import { cookies } from "next/headers";
interface Props {
  params: { locale: string; id: string };
}
export async function generateMetadata({
  params,
}: Props): Promise<Metadata | void> {
  const dict = await getDictionary(params.locale);
  try {
    const token = await getUserToken();
    const room = await getRoom(params.id, token);
    if (room)
      return {
        title: room.name,
      };
    return {
      title: dict.join_room.TITLE,
    };
  } catch {
    return {
      title: dict.main.ERROR,
    };
  }
}
const RoomPage = async ({ params }: Props) => {
  const token = await getUserToken();
  const dict = await getDictionary(params.locale);
  const room = await getRoom(params.id, token);
  if (!room)
    return (
      <div className="flex flex-row items-center justify-center">
        <RoomPassword messages={dict} />
      </div>
    );
  const user: any = await getMyProfile();
  return (
    <PageWrapper className="flex flex-col gap-6 p-6">
      <LocaleLink
        className="inline-flex gap-2 hover:gap-3 items-center transition-all duration-300 text-blue-600 font-semibold hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
        href={`/rooms`}
      >
        <AiFillCaretLeft className="rtl:rotate-180" />
        {dict.room.BACK_TO_ROOMS}
      </LocaleLink>
      <p className="text-2xl md:text-3xl font-black">{room.name}</p>
      <div className="flex flex-col md:flex-row gap-10 items-start h-full w-full">
        <LiveViewer dict={dict} room={room} user={user} />
      </div>
    </PageWrapper>
  );
};

export default RoomPage;
