"use client";
import React, { useEffect, useState } from "react";
import { Room } from "@/app/interfaces/room";
import { Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

interface Props {
  messages: any;
  room: Room;
  socket: Socket;
}

const LiveBox: React.FC<Props> = ({ messages, room, socket }) => {
  const [stream, setStream] = useState<MediaStream>();
  const [isOffline, setIsOffline] = useState<boolean>(false);
  useEffect(() => {
    socket.emit("receiveLive");
    const connection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    connection.ontrack = (event) => {
      setStream(event.streams[0]);
    };
    const onReceiveOffer = (offer: RTCSessionDescriptionInit) => {
      connection
        .setRemoteDescription(offer)
        .then(() => {
          return connection.createAnswer();
        })
        .then((answer) => {
          return connection.setLocalDescription(answer);
        })
        .then(() => {
          socket.emit("answer", connection.localDescription);
        });
    };

    const onReceiveCandidate = (candidate: RTCIceCandidateInit) => {
      connection.addIceCandidate(candidate);
    };
    const onReceiveLiveOffline = () => {
      setStream(undefined);
      setIsOffline(true);
    };
    const liveStarted = () => {
      socket.emit("receiveLive");
      setIsOffline(false);
    };
    const liveStopped = () => {
      setStream(undefined);
      setIsOffline(true);
    };
    socket.on("liveStarted", liveStarted);
    socket.on("liveStopped", liveStopped);
    socket.on("liveOffline", onReceiveLiveOffline);
    socket.on("offer", onReceiveOffer);
    socket.on("candidate", onReceiveCandidate);

    return () => {
      socket.off("offer", onReceiveOffer);
      socket.off("liveOffline", onReceiveLiveOffline);
      socket.off("liveStopped", liveStopped);
      socket.off("liveStarted", liveStarted);
      socket.off("candidate", onReceiveCandidate);
      connection.close();
    };
  }, [socket]);
  return (
    <div className="card w-full md:order-2 h-96 p-3">
      {!isOffline ? (
        <video
          className="w-full h-full"
          autoPlay
          controls
          ref={(video) => {
            if (video && stream) {
              video.srcObject = stream;
            }
          }}
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-2xl">Live Offline</p>
        </div>
      )}
    </div>
  );
};

export default LiveBox;
