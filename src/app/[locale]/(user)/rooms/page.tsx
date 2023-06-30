import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import RoomCard from "./components/room-card";
import GuestJoin from "@/app/[locale]/components/guest-join";
import CreateRoom from "../components/create-room";
import { getRooms } from "@/app/utils/server/room";
import type { Room } from "@/app/interfaces/room";
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.rooms.TITLE,
  };
}

const RoomsPage = async ({
  params: { locale },
  searchParams: { page },
}: {
  params: { locale: string };
  searchParams: { page: string };
}) => {
  const [dict, rooms] = await Promise.all([getDictionary(locale), getRooms()]);
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start md:p-24">
      <aside className="w-full md:w-1/2 p-6 md:p-0">
        <h1 className="text-2xl font-black">{dict.rooms.TITLE}</h1>
        <div className="flex flex-col gap-5">
          {rooms.map((room: Room) => (
            <RoomCard roomData={room} key={room.id} />
          ))}
        </div>
      </aside>
      <div className="flex flex-col gap-3">
        <GuestJoin messages={dict} />
        <CreateRoom messages={dict} />
      </div>
    </div>
  );
};

export default RoomsPage;
