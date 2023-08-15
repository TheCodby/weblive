"use client";
import React from "react";

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
import { Separator } from "./ui/separator";

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
          placeholder="Search..."
          className="cursor-pointer hidden lg:block w-96"
          icon={<Search size={20} strokeWidth={3} />}
          readOnly
        />
        <div className="lg:hidden">
          <Search size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90vw] lg:w-full lg:max-w-[800px] p-0 overflow-hidden rounded-lg gap-0">
        <DialogHeader>
          <TextInput
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            icon={<Search size={16} strokeWidth={3} />}
            className="rounded-lg rounded-b-none h-full p-3"
          />
        </DialogHeader>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div>{error.message}</div>
        ) : isSuccess ? (
          <div className="flex flex-col">
            {data.rooms.length > 0 ? (
              data.rooms.map((room: Room, index: number) => (
                <>
                  {index > 0 ? <Separator /> : null}
                  <RoomCard
                    key={room.id}
                    owner={room.owner}
                    room={room}
                    className="rounded-none"
                  />
                </>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 p-3">
                There is no rooms
              </div>
            )}
          </div>
        ) : null}
        {isFetching && !isLoading && <Loading />}
      </DialogContent>
    </Dialog>
  );
};

export default SearchRooms;
