"use client";
import { Room } from "@/app/interfaces/room";
import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import Loading from "../../components/loading";
import Image from "next/image";
interface UserMessage {
  sender?: string;
  picture?: string;
}
interface Message extends UserMessage {
  type: "user" | "system";
  message: string;
}
interface Props {
  messages: any;
  room: Room;
  socket: Socket;
}
const Chat: React.FC<Props> = ({ messages, room, socket }) => {
  const messagesDiv: any = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  useEffect(() => {
    socket.auth = { token: localStorage.getItem("token") };
    socket.io.opts.query = { roomId: room.id };
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onIncomeMessage(message: Message) {
      setChatMessages((currentMessages: Message[]) => {
        message.type = "user";
        return [...currentMessages, message];
      });
    }
    function userJoinedRoom(message: Message) {
      setChatMessages((currentMessages: Message[]) => {
        message.type = "system";
        message.message = `${message.sender} ${messages.chat.JOINED_ROOM}`;
        return [...currentMessages, message];
      });
    }
    function onUserLeftRoom(message: Message) {
      setChatMessages((currentMessages: Message[]) => {
        message.type = "system";
        message.message = `${message.sender} ${messages.chat.LEFT_ROOM}`;
        return [...currentMessages, message];
      });
    }
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("message", onIncomeMessage);
    socket.on("joinedRoom", userJoinedRoom);
    socket.on("leftRoom", onUserLeftRoom);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onIncomeMessage);
      socket.off("disconnect", onDisconnect);
      socket.off("leftRoom", onUserLeftRoom);
      socket.off("joinedRoom", userJoinedRoom);
      socket.disconnect();
    };
  }, [socket, room.id]);
  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (message.length > 0 && message.replace(/\s/g, "").length == 0) return;
    socket.emit("sendMessage", message);
    setMessage("");
    setTimeout(() => {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }, 100);
  };
  return (
    <div className="w-full order-last md:order-1 card h-[calc(100vh-30vh)]">
      <div className="flex flex-col h-full p-3">
        {isConnected ? (
          <div className="flex flex-col h-full justify-between gap-2">
            <div
              className="flex flex-col h-fit overflow-y-auto gap-4"
              ref={messagesDiv}
            >
              {chatMessages.map((message: Message, index: number) => (
                <div className="flex flex-col flex-grow" key={index}>
                  <div className="flex flex-col gap-2 p-4 mx-2 hover:dark:bg-neutral-800 hover:bg-neutral-200 rounded-xl">
                    <div className="flex flex-row items-center gap-2 ">
                      <div className="w-8 h-8 rounded-full bg-gray-300 relative overflow-hidden">
                        {message.picture ? (
                          <Image
                            fill
                            src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${message.picture}`}
                            alt=""
                          />
                        ) : null}
                      </div>
                      {message.type === "system" ? (
                        <div className="text-sm font-semibold">
                          {message.message}
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col">
                            <div className="text-sm font-semibold">
                              {message.sender}
                            </div>
                            <div className="text-xs text-gray-500">
                              {message.message}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form className="w-full" onSubmit={sendMessage}>
              <input
                onChange={(e: any) => setMessage(e.target.value)}
                value={message}
                type="text"
                className="w-full"
                placeholder={messages.chat.PLACEHOLDER}
              />
            </form>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Chat;
