import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import RoomCard from "../../../components/room-card";
import JoinRoom from "./components/join-room";
import CreateRoom from "./components/create-room";
import { getRooms } from "@/app/utils/room";
import type { Room } from "@/app/interfaces/room";
import PageWrapper from "@/app/[locale]/components/page-wrapper";
import Pagination from "@/app/[locale]/components/ui/pagination";
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
interface Response {
  rooms: Room[];
  pages: number;
}
const RoomsPage = async ({
  params: { locale },
  searchParams: { page = "1" },
}: {
  params: { locale: string };
  searchParams: { page: string };
}) => {
  const [dict, data]: [any, Response] = await Promise.all([
    getDictionary(locale),
    getRooms(page),
  ]);
  return (
    <PageWrapper className="flex flex-col lg:flex-row gap-4 justify-center lg:mt-6">
      <aside className="basis-1/2 w-full lg:w-1/2 p-6 lg:p-0">
        <h1 className="text-2xl font-black">{dict.rooms.TITLE}</h1>
        <div className="flex flex-col gap-5">
          {data.rooms.length > 0 ? (
            data.rooms.map((room: Room) => (
              <RoomCard room={room} key={room.id} />
            ))
          ) : (
            <p className="text-xl font-semibold text-center">
              {dict.rooms.NO_ROOMS}
            </p>
          )}
          {data.pages > 1 && (
            <Pagination
              currentPage={parseInt(page)}
              pages={data.pages}
              path="/rooms"
            />
          )}
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
