"use client";
import useLocale from "@/app/hooks/useLocale";
import { useRouter } from "next/navigation";
import React from "react";

const JoinRoom = ({ messages }: { messages: any }) => {
  const locale = useLocale();
  const [roomId, setRoomId] = React.useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    router.push(`/${locale}/rooms/${roomId}`);
    e.preventDefault();
  };

  return (
    <div className="card p-6 rounded-3xl justify-center text-center m-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-2xl font-black dark:text-slate-200 text-slate-900 tracking-tight">
          {messages.join_room.TITLE}
        </p>
        <input
          className="text-center self-center ltr:tracking-[0.2rem] rounded w-3/4"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder={messages.join_room.ROOM_ID}
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
        />
        <div>
          <button type="submit" className="w-1/2 btn">
            {messages.join_room.JOIN}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoom;
