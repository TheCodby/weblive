import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import SocialConnect from "../components/social-connect";
import { BsDiscord } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
const PreferencePage = () => {
  return (
    <PageWrapper className="w-full h-full flex flex-col gap-2">
      <p className="font-bold text-3xl">Connections</p>
      <div className="grid lg:grid-cols-2 gap-4 lg:w-1/2">
        <SocialConnect
          social="Discord"
          icon={<BsDiscord size={42} />}
          link={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_WEB}/oauth/callback/discord&response_type=code&scope=identify%20email`}
        />
        <SocialConnect
          social="Google"
          icon={<AiFillGoogleCircle size={42} />}
          link={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_WEB}/oauth/callback/google&response_type=code&scope=openid%20profile%20email`}
        />
      </div>
    </PageWrapper>
  );
};

export default PreferencePage;
