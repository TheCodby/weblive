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
  const user = await getMyProfile();
  const token = getUserToken();
  if (user)
    data = await oauthConnect(params.provider, searchParams.code, token);
  else data = await oauthLogin(params.provider, searchParams.code);
  return <LoginComponent data={data} type={user ? "connect" : "login"} />;
};

export default ProviderPage;
