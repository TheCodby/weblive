"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useParams } from "next/navigation";
import Loading from "@/app/[locale]/components/loading";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import Button from "@/app/[locale]/components/ui/button";
import TextInput from "@/app/[locale]/components/ui/text-input";
import Card from "@/app/[locale]/components/ui/card";
const RoomPassword: React.FC<{ messages: any }> = ({ messages }) => {
  const [password, setPassword] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/rooms/${params.id}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ password }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast(data.message, {
        theme: getUserTheme(),
        type: "success",
      });
      router.refresh();
    } catch (err: any) {
      toast(err.message, {
        theme: getUserTheme(),
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="p-6 rounded-3xl justify-center text-center m-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-2xl font-black dark:text-slate-200 text-slate-900 tracking-tight">
          {messages.room_passwrod.TITLE}
        </p>
        <TextInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-center self-center rounded-full"
          type="password"
          placeholder={messages.room_passwrod.PASSWORD}
        />
        <div>
          <Button disabled={isLoading} type="submit" className="w-1/2">
            {isLoading ? (
              <>
                <Loading /> {messages.main.LOADING}
              </>
            ) : (
              messages.room_passwrod.JOIN
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RoomPassword;
