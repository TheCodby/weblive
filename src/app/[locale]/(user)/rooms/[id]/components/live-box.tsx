"use client";
import React, { useEffect, useState } from "react";
import { Room } from "@/app/interfaces/room";
import { Socket } from "socket.io-client";
import Card from "@/app/[locale]/components/ui/card";
import { useRouter } from "next/navigation";
import useLocale from "@/app/hooks/useLocale";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";

interface Props {
  messages: any;
  room: Room;
  socket: Socket;
}

const LiveBox: React.FC<Props> = ({ messages, room, socket }) => {
  const router = useRouter();
  const locale = useLocale();
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
    const onRoomUpdated = () => {
      router.refresh();
      toast(messages.live.ROOM_UPDATED, {
        type: "success",
        theme: getUserTheme(),
      });
    };
    const onRoomDeleted = () => {
      router.push(`/${locale}/rooms`);
      toast(messages.live.ROOM_DELETED, {
        type: "success",
        theme: getUserTheme(),
      });
    };
    socket.on("liveStarted", liveStarted);
    socket.on("roomUpdated", onRoomUpdated);
    socket.on("roomDeleted", onRoomDeleted);
    socket.on("liveStopped", liveStopped);
    socket.on("liveOffline", onReceiveLiveOffline);
    socket.on("offer", onReceiveOffer);
    socket.on("candidate", onReceiveCandidate);

    return () => {
      socket.off("offer", onReceiveOffer);
      socket.off("liveOffline", onReceiveLiveOffline);
      socket.off("roomUpdated", onRoomUpdated);
      socket.off("roomDeleted", onRoomDeleted);
      socket.off("liveStopped", liveStopped);
      socket.off("liveStarted", liveStarted);
      socket.off("candidate", onReceiveCandidate);
      connection.close();
    };
  }, [socket]);
  return (
    <Card className="w-full lg:order-2 h-96 p-3">
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
    </Card>
  );
};

export default LiveBox;
