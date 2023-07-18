import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import SocialConnect from "./components/social-connect";
import { BsFacebook, BsGoogle, BsTwitch } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillGoogleCircle } from "react-icons/ai";
import { FiTwitch } from "react-icons/fi";
import ProfileVisibility from "./components/profile-visibility";
const PreferencePage = () => {
  return (
    <PageWrapper className="w-full h-full flex flex-col gap-2">
      <p className="font-bold text-3xl">Connections</p>
      <div className="grid lg:grid-cols-2 gap-4 lg:w-1/2">
        <SocialConnect
          social="Facebook"
          icon={<BsFacebook size={42} />}
          link=""
        />
        <SocialConnect
          social="Twitter"
          icon={<AiFillTwitterCircle size={42} />}
          link=""
        />
        <SocialConnect social="Twitch" icon={<FiTwitch size={42} />} link="" />
        <SocialConnect
          social="Google"
          icon={<AiFillGoogleCircle size={42} />}
          link=""
        />
      </div>
      <p className="font-bold text-3xl mt-4">Profile Visibility</p>
      <ProfileVisibility />
    </PageWrapper>
  );
};

export default PreferencePage;
