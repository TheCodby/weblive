import "server-only";
import { cookies } from "next/headers";

export const getRooms = async (page: string = "1") => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/rooms?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return data;
  } catch (err) {
    return null;
  }
};
export const getRoom = async (id: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return data;
  } catch (err) {
    return null;
  }
};
