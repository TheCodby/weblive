import "server-only";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { User } from "@/app/interfaces/user";

export const getUserByToken = (token: string): User | false => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as User;
  } catch (err) {
    return false;
  }
};
export const getUserToken = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  return token.value;
};
export const getProfile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  if (!token) return false;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/profile`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data = await res.json();
  return data;
};
