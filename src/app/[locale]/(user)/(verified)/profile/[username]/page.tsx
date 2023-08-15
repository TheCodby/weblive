import { User } from "@/app/interfaces/user";
import { decodeUser, getUserToken } from "@/app/utils/server/user";
import Image from "next/image";
import React from "react";
import Card from "@/app/[locale]/components/ui/card";
import RoomsGrid from "@/app/[locale]/components/rooms-grid";
import { NextPage } from "next";
import FollowButton from "@/app/[locale]/(user)/components/follow-button";
import { getProfile } from "@/app/utils/user";
import { formatCompactNumber } from "@/app/utils/main";
import { Lock } from "lucide-react";
interface Props {
  params: { locale: string; username: string };
}
const ProfilePage: NextPage<Props> = async ({ params }) => {
  const token = getUserToken();
  const user = await getProfile(params.username, token);
  const decodedUser: User = decodeUser(token) as User;
  const selfProfile = user?.id === decodedUser.id;
  if (!user) {
    return (
      <div className="pt-6">
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-3xl font-black">
            Oops! The profile {`you're`} trying to view is set to private.
          </p>
          <Lock size={128} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full h-[70vh] relative">
        <Image
          fill
          alt=""
          src="/assets/default-cover.jpg"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col lg:mx-24 lg:my-4 gap-4 p-4 lg:p-0">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-2">
          <div className="flex flex-row gap-3 items-center">
            <div className="basis-auto">
              <div className="w-20 h-20 relative">
                <Image
                  fill
                  className="rounded-full"
                  src={user.avatar}
                  alt="user image"
                  objectFit="cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-start w-full">
              <p className="text-xl font-bold inline-flex items-center gap-2">
                {user.username}{" "}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </p>
              <p className="text-md text-gray-500">
                {formatCompactNumber(user.followers!)} followers
              </p>
            </div>
          </div>
          {!selfProfile ? (
            <div className="w-full lg:w-auto">
              <FollowButton userId={user.id} isFollowing={user.isFollowing} />
            </div>
          ) : null}
        </div>
        <Card className="flex flex-col justify-center p-6 gap-10 dark:bg-neutral-950/60">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold">About {user.username}</p>
            <p className="text-md dark:text-gray-300 break-words">{user.bio}</p>
          </div>
        </Card>
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Rooms</p>
          <RoomsGrid rooms={user.rooms} owner={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
