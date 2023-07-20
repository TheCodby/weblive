import { User } from "@/app/interfaces/user";
import { getProfile } from "@/app/utils/server/user";
import Image from "next/image";
import React from "react";
import Card from "../../components/ui/card";
import RoomsGrid from "../../components/rooms-grid";

const MyProfilePage = async () => {
  const user: User = await getProfile();
  console.log(user);
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
      <div className="flex flex-col lg:mx-24 lg:my-4 gap-4">
        <div className="flex flex-row gap-3 items-center">
          <div className="basis-auto">
            <div className="w-20 h-20 relative">
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
          </div>
        </div>
        <Card className="flex flex-col justify-center p-6 gap-10 dark:bg-neutral-950/60">
          <div className="flex flex-col gap-3">
            <p className="text-3xl font-bold">About {user.username}</p>
            <p className="text-md dark:text-gray-300 break-words">{user.bio}</p>
          </div>
        </Card>
        <div className="flex flex-col gap-3">
          <p className="text-3xl font-bold">Rooms</p>
          <RoomsGrid rooms={user.rooms} />
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
