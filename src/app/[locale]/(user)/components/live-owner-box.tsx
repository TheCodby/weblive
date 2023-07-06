"use client";
import React, { useState, useEffect } from "react";
import { Room } from "@/app/interfaces/room";
import { UserMedia, useUserMedia } from "@/app/hooks/useUserMedia";
import { Socket } from "socket.io-client";
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
    <div className="flex flex-col gap-4 card w-full basis-2/3 md:order-2 p-5 min-h-min text-center">
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
      <div className="flex flex-row gap-5 items-center justify-center">
        <button
          disabled={isLive}
          className="btn btn-primary"
          onClick={() => startLive()}
        >
          {messages.live.START}
        </button>
        <button
          disabled={!isLive}
          className="btn btn-primary"
          onClick={() => stopLive()}
        >
          {messages.live.STOP}
        </button>
      </div>
    </div>
  );
};

export default LiveOwnerBox;
