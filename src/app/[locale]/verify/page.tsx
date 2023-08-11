import "@/app/[locale]/globals.css";
import { verify } from "@/app/utils/user";
import { NextPage } from "next";
import React from "react";
import { ImCheckmark } from "react-icons/im";
import RedirectComponent from "@/app/[locale]/components/RedirectComponent";

interface Props {
  params: { locale: string };
  searchParams: { code: string };
}
const VerifyPage: NextPage<Props> = async ({ params, searchParams }) => {
  try {
    await verify(searchParams.code);
  } catch (e) {
    console.log(e);
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <ImCheckmark size={128} color="#03bc03" />
        <p className="text-4xl font-black">Verified</p>
        <p className="text-2xl">You have successfully verified your account</p>
        <RedirectComponent pathname={`/${params.locale}/auth/login`} />
      </div>
    </div>
  );
};

export default VerifyPage;
