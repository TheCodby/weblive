import { getDictionary } from "@/dictionaries";
import React from "react";
import PageWrapper from "./components/page-wrapper";
import { getRooms } from "../utils/server/room";
import { Room } from "../interfaces/room";
import TopRooms from "./components/top-rooms";
export const generateMetadata = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const dict = await getDictionary(locale);
  return {
    title: dict.home.TITLE,
  };
};
const HomePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const [dict, rooms]: [dict: any, rooms: Room[]] = await Promise.all([
    getDictionary(locale),
    getRooms(),
  ]);
  return (
    <PageWrapper className="p-10 md:p-24 flex flex-col md:flex-row text-center h-full justify-between gap-4">
      <div className="rounded-3xl basis-2/5 flex flex-col text-start gap-6">
        <p className="text-3xl md:text-5xl font-black tracking-tighter text-center">
          {dict.home.MAIN_MESSAGE}
        </p>
        <p className={`text-md md:text-xl font-medium text-center`}>
          {dict.home.MESSAGE2}
        </p>
      </div>
      <TopRooms dict={dict} rooms={rooms} />
    </PageWrapper>
  );
};

export default HomePage;
