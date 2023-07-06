"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import { useRouter } from "next/navigation";
import { User } from "@/app/interfaces/user";
const ProfilePicture = ({ messages, user }: { messages: any; user: User }) => {
  const [imageUrl, setImage] = React.useState(
    `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${user.avatar}`
  );
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
      toast.success(data.message, {
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
      toast.error(e.message, {
        theme: getUserTheme(),
      });
      setImage(
        `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.amazonaws.com/${user.avatar}`
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="card md:w-1/2 flex flex-col items-center md:flex-row gap-3 p-5">
      <div
        className={`w-40 h-32 relative overflow-hidden ${
          isLoading ? "animate-pulse" : ""
        }`}
      >
        <Image
          ref={avatarRef}
          alt="Profiel Picture"
          src={imageUrl}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-full"
        />
      </div>

      <div className="text-md flex flex-col md:flex-row justify-between items-center w-full gap-3">
        <div>
          <p className="dark:text-neutral-100">
            {messages.settings.account.UPLOAD_PICTURE_DESCRIPTION}
          </p>
          <p className="dark:text-neutral-300 text-sm">
            {messages.settings.account.PIRCTURE_FORMATS}
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          ref={ref}
          onChange={handleChange}
        />
        <button
          onClick={() => ref!.current!.click()}
          className="btn mb-3 dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-neutral-300 text-black dark:text-white shadow-none"
        >
          {messages.settings.account.UPLOAD_PICTURE}
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
