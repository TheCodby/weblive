import "@/app/[locale]/globals.css";
import { inter } from "@/app/fonts";
import { getMyProfile, getUserToken } from "@/app/utils/server/user";
import { oauthConnect, oauthLogin } from "@/app/utils/user";
import { NextPage } from "next";
import React from "react";
import LoginComponent from "./LoginComponent";

interface Props {
  params: { locale: string; provider: string };
  searchParams: { code: string };
}
const ProviderPage: NextPage<Props> = async ({ params, searchParams }) => {
  let data;
  let error: string = "";
  const user = await getMyProfile();
  const token = getUserToken();
  try {
    if (user)
      data = await oauthConnect(params.provider, searchParams.code, token);
    else data = await oauthLogin(params.provider, searchParams.code);
  } catch (e: any) {
    error = e.message;
  }
  return (
    <html>
      <body
        className={`h-full w-full bg-neutral-900 flex flex-col justify-center items-center text-white ${inter.className}`}
      >
        <LoginComponent
          user={data}
          type={user ? "connect" : "login"}
          error={error}
        />
      </body>
    </html>
  );
};

export default ProviderPage;
