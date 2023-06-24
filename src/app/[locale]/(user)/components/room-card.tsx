import React from "react";
import LocaleLink from "../../components/locale-link";
interface Props {
  roomId: number;
  roomName: string;
  roomUsers: number;
  roomOwner: string;
}
const RoomCard: React.FC<Props> = ({
  roomId,
  roomName,
  roomUsers,
  roomOwner,
}) => {
  return (
    <LocaleLink href="/">
      <div className="card flex flex-col p-4 justify-between hover:bg-neutral-300 hover:dark:bg-neutral-800">
        <h1 className="text-2xl font-black">{roomName}</h1>
        <div className="flex flex-row justify-between">
          <p className="text-sm">Online: {roomUsers}/128</p>
          <p className="text-sm">{roomOwner}</p>
        </div>
      </div>
    </LocaleLink>
  );
};

export default RoomCard;
