import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import RoomCard from "../components/room-card";
import GuestJoin from "@/app/[locale]/components/guest-join";
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
}: {
  params: { locale: string };
}) => {
  const dict = await getDictionary(locale);
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:items-start md:p-24">
      <aside className="w-full md:w-1/2 p-6 md:p-0">
        <h1 className="text-2xl font-black">Rooms</h1>
        <div className="flex flex-col gap-5">
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
          <RoomCard roomId={1} roomName="f" roomUsers={20} roomOwner="fdggdf" />
        </div>
      </aside>
      <GuestJoin messages={dict} />
    </div>
  );
};

export default RoomsPage;
