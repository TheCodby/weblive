import "server-only";
import { cookies } from "next/headers";

export const getRooms = async (page: string = "1") => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/rooms?page=${page}`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
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
      throw new Error(data.message, {
        cause: res.status,
      });
    }
    return data;
  } catch (err: any) {
    return err.cause;
  }
};
