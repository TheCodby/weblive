import { setCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ApiError } from "./errors/api-errors";
import { notFound } from "next/navigation";
export const handleLogin = async (data: any) => {
  localStorage.setItem("token", data.token);
  setCookie("token", data.token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //
  });
  localStorage.setItem(
    "picture",
    `${process.env.NEXT_PUBLIC_API}/${data?.user?.picture}`
  );
};
export const verify = async (code: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/verify?code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
export const oauthLogin = async (provider: string, code: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/callback/${provider}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );
  const data = await res.json();
  if (!res.ok) return false;
  return data;
};
export const oauthConnect = async (
  provider: string,
  code: string,
  token: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/me/connect/${provider}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ code }),
    }
  );
  const data = await res.json();
  if (!res.ok) return false;
  return data;
};
export const followUser = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
export const unfollowUser = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/users/${id}/unfollow`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
export const getProfile = async (username: string, token: string) => {
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
export const changeEmail = async (email: string, token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/change-email`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
