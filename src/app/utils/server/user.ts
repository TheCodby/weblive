import "server-only";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { User } from "@/app/interfaces/user";
import { ApiError } from "../errors/api-errors";
import { notFound } from "next/navigation";

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
export const getMyProfile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  if (!token) return false;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/profile`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
export const getProfile = async (username: string) => {
  const token = await getUserToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${username}`, {
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
