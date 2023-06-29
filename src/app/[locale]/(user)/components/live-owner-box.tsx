"use client";
import React, { useState, useEffect } from "react";
import { Room } from "@/app/interfaces/room";
import { useUserMedia } from "@/app/hooks/useUserMedia";
import { Socket } from "socket.io-client";
import RecordRTC from "recordrtc";
interface Props {
  messages: any;
  room: Room;
  socket: Socket;
}
const LiveOwnerBox: React.FC<Props> = ({ messages, room, socket }) => {
  const { stream, error, start, close } = useUserMedia({
    audio: true,
    video: true,
  });
  useEffect(() => {
    if (stream) {
      // add stream to video element and send it to server to broadcast
    }
    return () => {
      close();
    };
  }, [stream]);
  if (error) {
    console.log(error + "error");
    return null;
  }
  return (
    <div className="card w-full md:order-2 h-fit p-2">
      <video
        className="w-full h-full"
        autoPlay
        ref={(video) => {
          if (video) {
            video.srcObject = stream as MediaStream;
          }
        }}
      />
      <div className="flex flex-row gap-5 items-center justify-center my-4">
        <button className="btn btn-primary" onClick={() => start()}>
          {messages.live.START}
        </button>
        <button className="btn btn-primary" onClick={() => close()}>
          {messages.live.STOP}
        </button>
      </div>
    </div>
  );
};

export default LiveOwnerBox;
