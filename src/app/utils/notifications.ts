import { ApiError } from "./errors/api-errors";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { notFound } from "next/navigation";
import { INotif } from "../interfaces/notification";
export const getNotificationNumbers = async (
  token: string | RequestCookie
): Promise<number> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "same-origin",
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new ApiError(data.message, res.status);
  }
  return data;
};
export const getNotifications = async (
  token: string | RequestCookie
): Promise<INotif[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/me/notifications/read`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(res.ok);
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new ApiError(data.message, res.status);
  }
  return data;
};
