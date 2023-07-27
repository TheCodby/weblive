import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import SocialConnect from "../components/social-connect";
import { BsDiscord } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import ProfileVisibility from "../components/profile-visibility";
const PreferencePage = () => {
  return (
    <PageWrapper className="w-full h-full flex flex-col gap-2">
      <p className="font-bold text-3xl">Connections</p>
      <div className="grid lg:grid-cols-2 gap-4 lg:w-1/2">
        <SocialConnect
          social="Discord"
          icon={<BsDiscord size={42} />}
          link=""
        />
        <SocialConnect
          social="Google"
          icon={<AiFillGoogleCircle size={42} />}
          link=""
        />
      </div>
    </PageWrapper>
  );
};

export default PreferencePage;
