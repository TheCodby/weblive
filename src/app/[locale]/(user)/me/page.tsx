import { User } from "@/app/interfaces/user";
import { getProfile } from "@/app/utils/server/user";
import Image from "next/image";
import React from "react";
import Card from "../../components/ui/card";
import Button from "../../components/ui/button";
import RoomsGrid from "../../components/rooms-grid";

const MyProfilePage = async () => {
  const user: User = await getProfile();
  console.log(user);
  return (
    <Card className="flex flex-col justify-center lg:mx-24 lg:my-12 p-6 gap-10 dark:bg-neutral-950/60">
      <div className="flex flex-row gap-3 items-center">
        <div className="basis-auto">
          <div className="w-32 h-32 relative">
            <Image
              fill
              className="rounded-full"
              src={`https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${user.avatar}`}
              alt="user image"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 text-start w-1/2">
          <p className="text-xl font-bold inline-flex items-center gap-2">
            {user.username}{" "}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </p>
          <p className="text-md text-gray-500">125K followers</p>
          <p className="text-md dark:text-gray-300 break-words">{user.bio}</p>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="self-end">
            <Button size="large">Edit Profile</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Rooms</p>
        <RoomsGrid rooms={user.rooms} />
      </div>
    </Card>
  );
};

export default MyProfilePage;
