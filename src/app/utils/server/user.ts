import "server-only";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
export const getUserByToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    return false;
  }
};
export const getProfile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/profile`, {
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
