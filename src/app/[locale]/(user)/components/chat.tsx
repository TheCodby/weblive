"use client";
import { Room } from "@/app/interfaces/room";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
interface Props {
  messages: any;
  room: Room;
}
const socket: Socket = io("http://127.0.0.1:3001", {
  autoConnect: false,
});
const Chat: React.FC<Props> = ({ messages, room }) => {
  useEffect(() => {
    socket.connect();
    socket.emit("message", "hello");
  }, []);
  return (
    <div className="w-full h-full card">
      <div className="flex flex-col h-full">
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="flex flex-col">
              <div className="text-sm font-semibold">{room.name}</div>
              <div className="text-xs text-gray-500">{room.description}</div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex flex-col gap-2 p-4">
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold">User</div>
                <div className="text-xs text-gray-500">Message</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
