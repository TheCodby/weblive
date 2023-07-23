import { setCookie } from "cookies-next";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { ApiError } from "./errors/api-errors";
export const handleLogin = async (
  data: any,
  router: AppRouterInstance,
  locale: string
) => {
  localStorage.setItem("token", data.token);
  setCookie("token", data.token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //
  });
  localStorage.setItem(
    "picture",
    `${process.env.NEXT_PUBLIC_API}/${data?.user?.picture}`
  );
  router.push(`/${locale}/rooms`);
  router.refresh();
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
  if (!res.ok) throw new ApiError(data.message, res.status);
  return data;
};