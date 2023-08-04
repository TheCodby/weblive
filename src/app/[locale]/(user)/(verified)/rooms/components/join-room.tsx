"use client";
import useLocale from "@/app/hooks/useLocale";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "@/app/[locale]/components/ui/button";
import TextInput from "@/app/[locale]/components/ui/text-input";
import Card from "@/app/[locale]/components/ui/card";

const JoinRoom = ({ messages }: { messages: any }) => {
  const locale = useLocale();
  const [roomId, setRoomId] = React.useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    router.push(`/${locale}/rooms/${roomId}`);
    e.preventDefault();
  };

  return (
    <Card className="p-6 rounded-3xl justify-center text-center m-4 lg:w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-2xl font-black dark:text-slate-200 text-slate-900 tracking-tight">
          {messages.join_room.TITLE}
        </p>
        <TextInput
          className="text-center self-center ltr:tracking-[0.2rem] rounded"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          placeholder={messages.join_room.ROOM_ID}
          onChange={(e) => setRoomId(e.target.value)}
          value={roomId}
        />
        <div>
          <Button type="submit">{messages.join_room.JOIN}</Button>
        </div>
      </form>
    </Card>
  );
};

export default JoinRoom;
