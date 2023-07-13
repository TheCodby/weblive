import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import RoomCard from "./components/room-card";
import JoinRoom from "@/app/[locale]/(user)/components/join-room";
import CreateRoom from "../components/create-room";
import { getRooms } from "@/app/utils/server/room";
import type { Room } from "@/app/interfaces/room";
import PageWrapper from "../../components/page-wrapper";
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
    <PageWrapper className="flex flex-col md:flex-row gap-4 justify-center p-6">
      <aside className="basis-1/2 w-full md:w-1/2 p-6 md:p-0">
        <h1 className="text-2xl font-black">{dict.rooms.TITLE}</h1>
        <div className="flex flex-col gap-5">
          {rooms.map((room: Room) => (
            <RoomCard roomData={room} key={room.id} />
          ))}
        </div>
      </aside>
      <div className="flex flex-col gap-3">
        <JoinRoom messages={dict} />
        <CreateRoom messages={dict} />
      </div>
    </PageWrapper>
  );
};

export default RoomsPage;
