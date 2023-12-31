"use client";
import React, { useEffect } from "react";
import Chat from "./chat";
import LiveBox from "./live-box";
import LiveOwnerBox from "./live-owner-box";
import { Room } from "@/app/interfaces/room";
import { Socket, io } from "socket.io-client";
import { User } from "@/app/interfaces/user";
interface Props {
  dict: any;
  room: Room;
  user: User;
}
const socket: Socket = io(`${process.env.NEXT_PUBLIC_API}`, {
  autoConnect: false,
});
const LiveViewer: React.FC<Props> = ({ dict, room, user }) => {
  console.log(room);
  useEffect(() => {
    socket.auth = { token: localStorage.getItem("token") };
    socket.io.opts.query = { roomId: room.id };
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Chat messages={dict} room={room} socket={socket} />
      {user.id !== room.ownerId ? (
        <LiveBox messages={dict} room={room} socket={socket} />
      ) : (
        <LiveOwnerBox messages={dict} room={room} socket={socket} />
      )}
    </>
  );
};

export default LiveViewer;
