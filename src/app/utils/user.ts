import { setCookie } from "cookies-next";
import { ApiError } from "./errors/api-errors";
import { notFound } from "next/navigation";
import { User } from "../interfaces/user";
import { TLocale } from "../types/locale";
export const handleLogin = async (data: any) => {
  localStorage.setItem("token", data.token);
  setCookie("token", data.token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
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
export const oauthLogin = async (
  provider: string,
  locale: string,
  code: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/callback/${provider}?locale=${locale}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
export const oauthConnect = async (
  provider: string,
  locale: string,
  code: string,
  token: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/me/connect/${provider}?locale=${locale}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
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
export const getProfile = async (
  username: string,
  token: string
): Promise<User | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 404) notFound();
    if (res.status === 403) return null;
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
export const signup = async (
  username: string,
  email: string,
  password: string,
  locale: TLocale
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      locale: locale,
    }),
  });
  const data = await res.json();
  if (!res.ok)
    throw new ApiError(data.message, res.status, {
      field: data.field,
    });
  return data;
};
export const login = async (username: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};
