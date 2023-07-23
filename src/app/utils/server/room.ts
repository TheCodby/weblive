import "server-only";
import { cookies } from "next/headers";
import { ApiError } from "../errors/api-errors";
import { Room } from "@/app/interfaces/room";
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
export const getRoom = async (id: string): Promise<Room> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new ApiError(data.message, res.status);
  }
  return data;
};
