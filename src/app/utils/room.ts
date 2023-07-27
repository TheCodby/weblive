import { ApiError } from "./errors/api-errors";
import { Room } from "@/app/interfaces/room";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { notFound } from "next/navigation";

export const getRooms = async (page: string = "1") => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rooms?page=${page}`, {
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(data.message, res.status);
  }
  return data;
};
export const getRoom = async (
  id: string,
  token: string | RequestCookie
): Promise<Room> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new ApiError(data.message, res.status);
  }
  return data;
};
