"use client";
import React from "react";
import { Room } from "@/app/interfaces/room";
import { useUserMedia } from "@/app/hooks/useUserMedia";
import { Socket } from "socket.io-client";

interface Props {
  messages: any;
  room: Room;
  socket: Socket;
}
const LiveBox: React.FC<Props> = ({ messages, room, socket }) => {
  return (
    <div className="card w-full md:order-2 h-96 p-3">
      <video
        autoPlay
        ref={(video) => {
          if (video) {
            // video.srcObject = stream;
          }
        }}
      />
    </div>
  );
};

export default LiveBox;
