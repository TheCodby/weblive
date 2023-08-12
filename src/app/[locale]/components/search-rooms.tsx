"use client";
import React, { useEffect, useRef, useState } from "react";

import TextInput from "./ui/text-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import RoomCard from "./room-card";
import Loading from "./loading";
import { Room } from "@/app/interfaces/room";
import { useDebounce } from "@/app/hooks/useDebounce";

const SearchRooms = ({
  messages,
  initialRooms,
}: {
  messages?: any;
  initialRooms: Room[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const debouncedValue = useDebounce(search, 500);
  const { data, isLoading, error, isSuccess, isFetching } = useQuery<
    any,
    { message: string },
    { rooms: Room[]; pages: number }
  >({
    queryKey: ["rooms-search", debouncedValue],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/rooms?search=${debouncedValue}`
      );
      return await res.json();
    },
    initialData: initialRooms,
  });
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger>
        <TextInput
          placeholder="Search rooms..."
          className="cursor-pointer"
          readOnly
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <DialogHeader>
          <TextInput
            placeholder="Room name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            icon={<Search size={16} />}
            className="rounded-b-none"
          />
        </DialogHeader>
        <div className="p-4">
          {isLoading ? (
            <Loading />
          ) : error ? (
            <div>{error.message}</div>
          ) : isSuccess ? (
            <div>
              <div className="flex flex-col gap-2">
                {data.rooms.length > 0 ? (
                  data.rooms.map((room: Room) => (
                    <RoomCard room={room} key={room.id} />
                  ))
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    There is no rooms
                  </div>
                )}
              </div>
            </div>
          ) : null}
          {isFetching && !isLoading && <Loading />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchRooms;
