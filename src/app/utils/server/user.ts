import "server-only";
import { cookies } from "next/headers";

export const getProfile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  try {
    const res = await fetch("http://127.0.0.1:3001/me/profile", {
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
