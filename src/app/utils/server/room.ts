import "server-only";
import { cookies } from "next/headers";
import { ApiError } from "../errors/api-errors";
import { Room } from "@/app/interfaces/room";

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
export const getRoom = async (id: string): Promise<Room | false> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data = await res.json();
  console.log(res.status);
  if (!res.ok) {
    // If the room is sucred by a password, the server will return a 403 status code and redirect to the password page
    if (res.status === 403) {
      return false;
    }
    throw new ApiError(data.message, res.status);
  }
  return data;
};
