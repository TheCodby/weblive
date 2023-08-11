import { getUserToken } from "@/app/utils/server/user";
import { oauthConnect } from "@/app/utils/user";
import { NextPage } from "next";
import React from "react";
import { ImCheckmark } from "react-icons/im";
import RedirectComponent from "@/app/[locale]/components/RedirectComponent";

interface Props {
  params: { locale: string; provider: string };
  searchParams: { code: string };
}
const ProviderPage: NextPage<Props> = async ({ params, searchParams }) => {
  const token = getUserToken();
  await oauthConnect(params.provider, params.locale, searchParams.code, token);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <ImCheckmark size={128} color="#03bc03" />
        <p className="text-4xl font-black">Connected</p>
        <p className="text-2xl">You{`'`}ll be redirected in 3 seconds.</p>
      </div>
      <RedirectComponent pathname={`/${params.locale}/rooms`} />
    </div>
  );
};

export default ProviderPage;
