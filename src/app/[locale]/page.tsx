import { getDictionary } from "@/dictionaries";
import React from "react";
import PageWrapper from "./components/page-wrapper";
import { getRooms } from "../utils/server/room";
import { Room } from "../interfaces/room";
import TopRooms from "./components/top-rooms";
import Button from "./components/ui/button";
import LocaleLink from "./components/locale-link";
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
    <PageWrapper className="p-3 lg:p-16 xl:p-24 flex flex-col h-full justify-between gap-8">
      <div className="rounded-3xl basis-2/5 flex flex-col text-start gap-6 lg:p-32">
        <p className="h1 text-4xl xl:h-40 xl:text-5xl font-black leading-tight tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          {dict.home.MAIN_MESSAGE}
        </p>
        <p className={`text-md md:text-xl font-light text-center`}>
          {dict.home.MESSAGE2}
        </p>
        <div className="flex flex-row gap-4 justify-center">
          <LocaleLink href="/rooms">
            <Button
              size="large"
              variant="secondary"
              className="bg-gradient-to-r from-pink-700 to-violet-700 shadow-transparent shadow-2xl hover:shadow-[0_0px_80px_-10px_rgba(0,0,0,0.8)] dark:hover:shadow-[0_0px_80px_-10px_rgba(255,255,255,0.5)] translate-y-1 hover:translate-y-0 transition-all duration-300"
            >
              {dict.home.GET_STARTED}
            </Button>
          </LocaleLink>
        </div>
      </div>
      <TopRooms dict={dict} rooms={rooms} />
    </PageWrapper>
  );
};

export default HomePage;
