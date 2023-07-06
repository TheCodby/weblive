"use client";
import React, { useState, useEffect } from "react";
import { Room } from "@/app/interfaces/room";
import { UserMedia, useUserMedia } from "@/app/hooks/useUserMedia";
import { Socket } from "socket.io-client";
import Button from "../../components/ui/button";
import { MdFiberManualRecord } from "react-icons/md";
import { AiOutlinePause } from "react-icons/ai";
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
    const onReceiveAnswer = (answer: { sender: string; body: any }) => {
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
    <div className="flex flex-col gap-4 card w-full basis-2/3 md:order-2 min-h-min text-center">
      <div className="flex flex-col gap-4 p-5">
        {isLive ? (
          <video
            className="w-full h-full"
            autoPlay
            ref={(video) => {
              if (video) {
                video.srcObject = stream as MediaStream;
              }
            }}
          />
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-2xl font-bold">{messages.live.NO_STREAM}</p>
          </div>
        )}
        <div className="flex flex-row gap-5 items-center justify-center bg-black/20 p-2 rounded-full">
          <div className="group flex relative">
            <button
              disabled={isLive}
              onClick={() => startLive()}
              className={`hover:dark:bg-neutral-800 hover:bg-neutral-200 rounded-full p-3 transition-all duration-200 disabled:dark:hover:bg-transparent disabled:hover:bg-transparent ${
                isLive ? "text-green-500" : "text-red-500"
              }`}
            >
              <MdFiberManualRecord size={32} />
            </button>
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-200 dark:bg-gray-800 text-sm text-black dark:text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 p-2 mx-auto"
            >
              Start
            </span>
          </div>

          <div className="group flex relative">
            <button
              disabled={!isLive}
              onClick={() => stopLive()}
              className={`hover:dark:bg-neutral-800 hover:bg-neutral-200 rounded-full p-3 transition-all duration-200 disabled:dark:hover:bg-transparent disabled:hover:bg-transparent ${
                isLive ? "text-gray-500" : "text-red-500"
              }}`}
            >
              <AiOutlinePause size={32} />
            </button>
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-200 dark:bg-gray-800 text-sm text-black dark:text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 p-2 mx-auto"
            >
              Stop
            </span>
          </div>
        </div>
      </div>
      <Button variant="primary" className="rounded-none">
        Room Settings
      </Button>
    </div>
  );
};

export default LiveOwnerBox;
