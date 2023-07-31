import "server-only";
import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";
import { User } from "@/app/interfaces/user";
import { ApiError } from "../errors/api-errors";

export const decodeUser = (token: string): User | false => {
  try {
    const userData = jwt.decode(token) as User;
    console.log(userData);
    return userData;
  } catch (err) {
    return false;
  }
};
export const getUserToken = () => {
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
