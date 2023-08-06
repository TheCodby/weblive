"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import { useRouter } from "next/navigation";
import { User } from "@/app/interfaces/user";
import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
const ProfilePicture = ({ messages, user }: { messages: any; user: User }) => {
  const [imageUrl, setImage] = React.useState(user.avatar);
  const [isLoading, setLoading] = React.useState(false);
  const ref: any = useRef(null);
  const router = useRouter();
  const avatarRef: any = useRef(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target!.files && e.target!.files!.length === 0) return;
    setLoading(true);
    const image = URL.createObjectURL(e.target!.files![0]);
    setImage(image);
    const formData = new FormData();
    formData.append("file", e.target!.files![0]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast(data.message, {
        type: "success",
        theme: getUserTheme(),
      });
      setImage(
        `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${data.image_url}`
      );
      localStorage.setItem(
        "picture",
        `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${data?.image_url}`
      );

      router.refresh();
    } catch (e: any) {
      toast(e.message, {
        type: "error",
        theme: getUserTheme(),
      });
      setImage(user.avatar);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="flex flex-col items-center lg:flex-row gap-3 p-5">
      <div className="basis-1/4">
        <div className="w-32 h-32 relative overflow-hidden ">
          <Image
            quality={100}
            ref={avatarRef}
            alt="Profiel Picture"
            src={imageUrl}
            fill
            style={{
              objectFit: "cover",
            }}
            className={`rounded-full ${isLoading ? "animate-pulse" : ""}`}
          />
        </div>
      </div>

      <div className="text-md flex flex-col lg:flex-row justify-between items-center w-full gap-3">
        <div>
          <p className="dark:text-neutral-100">
            {messages.settings.profile.UPLOAD_PICTURE_DESCRIPTION}
          </p>
          <p className="dark:text-neutral-300 text-sm">
            {messages.settings.profile.PIRCTURE_FORMATS}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          ref={ref}
          onChange={handleChange}
        />
        <Button
          onClick={() => ref!.current!.click()}
          variant="primary"
          disabled={isLoading}
        >
          {messages.settings.profile.UPLOAD_PICTURE}
        </Button>
      </div>
    </Card>
  );
};

export default ProfilePicture;
