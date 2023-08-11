import { oauthLogin } from "@/app/utils/user";
import { NextPage } from "next";
import React from "react";
import LoginComponent from "./LoginComponent";

interface Props {
  params: { locale: string; provider: string };
  searchParams: { code: string };
}
const ProviderPage: NextPage<Props> = async ({ params, searchParams }) => {
  const data = await oauthLogin(
    params.provider,
    params.locale,
    searchParams.code
  );

  return <LoginComponent data={data} />;
};
export default ProviderPage;
