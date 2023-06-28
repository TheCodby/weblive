"use client";
import React from "react";

const GuestJoin = ({ messages }: { messages: any }) => {
  return (
    <div className="card p-6 rounded-3xl justify-center text-center m-4">
      <div className="flex flex-col gap-4">
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
        />
        <div>
          <button className="w-1/2 btn">{messages.join_room.JOIN}</button>
        </div>
      </div>
    </div>
  );
};

export default GuestJoin;
