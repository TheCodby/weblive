"use client";
import React, { useState, useEffect } from "react";
import { Room } from "@/app/interfaces/room";
import { UserMedia, useUserMedia } from "@/app/hooks/useUserMedia";
import { Socket } from "socket.io-client";
import { MdFiberManualRecord } from "react-icons/md";
import { BsFillStopFill } from "react-icons/bs";
import TimerCounter from "./timer-counter";
const SettingsModal = dynamic(() => import("./settings-modal"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-6 h-6 dark:bg-slate-700 bg-gray-300 rounded-full m-2"></div>
  ),
});

import Card from "@/app/[locale]/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/[locale]/components/ui/tooltip";
import { FiSettings } from "react-icons/fi";
import dynamic from "next/dynamic";
interface Props {
  messages: any;
  room: Room;
  socket: Socket;
}
const LiveOwnerBox: React.FC<Props> = ({ messages, room, socket }) => {
  const [isLive, setIsLive] = useState(false);
  const { stream, error, start, close } = useUserMedia({
    audio: true,
    video: {
      width: 1280,
      height: 720,
    },
  }) as UserMedia & { stream: MediaStream | null };
  const [connections, setConnections] = useState<
    Map<string, RTCPeerConnection>
  >(new Map());
  useEffect(() => {
    const onRequestLive = (sender: string) => {
      if (!stream) return;
      const connection: RTCPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
        ],
      });
      setConnections((currentConnection) => {
        currentConnection.set(sender, connection);
        return currentConnection;
      });
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        connection.addTrack(track, stream);
      });
      connection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          socket.emit("candidate", {
            to: sender,
            candidate: event.candidate,
          });
        }
      };
      connection.onnegotiationneeded = () => {
        connection
          .createOffer()
          .then((offer: RTCLocalSessionDescriptionInit) => {
            return connection.setLocalDescription(offer);
          })
          .then(() => {
            socket.emit("offer", {
              to: sender,
              offer: connection.localDescription,
            });
          });
      };
    };
    const onReceiveAnswer = (answer: {
      sender: string;
      body: RTCSessionDescriptionInit;
    }) => {
      if (connections.has(answer.sender)) {
        connections.get(answer.sender)?.setRemoteDescription(answer.body);
      }
    };
    const onUserLeft = (sender: string) => {
      if (connections.has(sender)) {
        connections.get(sender)?.close();
        connections.delete(sender);
      }
    };
    socket.on("leftRoom", onUserLeft);
    socket.on("answer", onReceiveAnswer);
    socket.on("userRequestLive", onRequestLive);
    return () => {
      socket.off("answer", onReceiveAnswer);
      socket.off("offer");
      socket.off("leftRoom", onUserLeft);
      socket.off("userRequestLive", onRequestLive);
      socket.off("candidate");
    };
  }, [stream]);
  if (error) {
    return null;
  }
  const startLive = () => {
    setConnections((currentConnection) => {
      currentConnection.forEach((connection) => {
        connection.close();
      });
      currentConnection.clear();
      return currentConnection;
    });
    start().then(() => {
      socket.emit("live");
      setIsLive(true);
    });
  };
  const stopLive = () => {
    setConnections((currentConnection) => {
      currentConnection.forEach((connection) => {
        connection.close();
      });
      currentConnection.clear();
      return currentConnection;
    });
    socket.emit("stopLive");
    close();
    setIsLive(false);
  };
  return (
    <Card className="flex flex-col w-full basis-2/3 lg:order-2 min-h-min text-center">
      <div className="flex flex-col gap-4 p-5">
        <TimerCounter isLive={isLive} />
        {isLive ? (
          <video
            className="w-full h-full"
            muted
            autoPlay
            ref={(video) => {
              if (video) {
                video.srcObject = stream as MediaStream;
              }
            }}
          />
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-2xl font-bold uppercase">
              {messages.live.NO_STREAM}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-row gap-5 items-center justify-center bg-white/50 dark:bg-black/20 p-2 rounded-t-full shadow-2xl">
        {isLive ? (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => stopLive()}
                  className="text-red-500 dark:text-red-700 hover:dark:bg-neutral-800 peer hover:bg-neutral-200 rounded-full p-2 transition-all duration-200 disabled:dark:hover:bg-transparent disabled:hover:bg-transparent"
                >
                  <BsFillStopFill size={32} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={isLive}
                  onClick={() => startLive()}
                  className="text-red-500 dark:text-red-700 hover:dark:bg-neutral-800 hover:bg-neutral-200 peer rounded-full p-2 transition-all duration-200 disabled:dark:hover:bg-transparent disabled:hover:bg-transparent"
                >
                  <MdFiberManualRecord size={32} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Start</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <SettingsModal room={room} messages={messages}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="hover:dark:bg-neutral-800 hover:bg-neutral-200 peer rounded-full p-2 transition-all duration-200 disabled:dark:hover:bg-transparent disabled:hover:bg-transparent">
                <FiSettings size={24} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SettingsModal>
      </div>
    </Card>
  );
};

export default LiveOwnerBox;
