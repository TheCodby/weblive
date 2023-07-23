"use client";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "../../../components/loading";
import { useRouter } from "next/navigation";
import LocaleLink from "@/app/[locale]/components/locale-link";
import useLocale from "@/app/hooks/useLocale";
import Button from "../../../components/ui/button";
import TextInput from "../../../components/ui/text-input";
import Card from "../../../components/ui/card";
import { BsDiscord, BsGoogle } from "react-icons/bs";
import Link from "next/link";
import { handleLogin } from "@/app/utils/user";
const LoginCard = ({ messages }: { messages: any }) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState();
  const router = useRouter();

  const sendLoginRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      handleLogin(data, router, locale);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Card className="p-6 rounded-3xl justify-center text-center m-4">
        <h1 className="text-2xl font-black tracking-tight">
          {messages.login.WELCOME_MESSAGE}{" "}
          <span className="dark:text-blue-700 text-blue-500 tracking-tighter">
            WebLive
          </span>
          !
        </h1>
        <p className="dark:text-slate-200 tracking-tight font-medium text-slate-900 mt-1">
          {messages.login.LOGIN_FIRST}
        </p>
        <form
          className="flex flex-col mt-6 gap-4"
          onSubmit={sendLoginRequest}
          autoComplete="on"
        >
          <TextInput
            icon={<FaUserAlt />}
            autoComplete="username"
            value={username}
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder={messages.user.USERNAME}
            className={`${error ? "invalid" : ""}`}
            disabled={isLoading}
            error={error}
            required
            animatedPlaceholder
          />
          <TextInput
            icon={<RiLockPasswordFill />}
            autoComplete="current-password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder={messages.user.PASSWORD}
            disabled={isLoading}
            required
            animatedPlaceholder
          />
          <div>
            <Button type="submit" className="w-1/2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loading />
                  {messages.main.LOADING}
                </>
              ) : (
                messages.login.LOGIN
              )}
            </Button>
          </div>
          <div className="flex flex-col gap-4 border-t pt-4 dark:border-neutral-800">
            <Link href="">
              <Button className="bg-[#DB4437] dark:bg-[#DB4437] hover:bg-[#872920] hover:dark:bg-[#872920] p-3 w-full">
                Continue with Google <BsGoogle size={24} />
              </Button>
            </Link>
            <Link
              href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_WEB}/oauth/callback/discord&response_type=code&scope=identify`}
            >
              <Button className="bg-[#5865F2] dark:bg-[#5865F2] hover:bg-[#4752c3] hover:dark:bg-[#4752c3] p-3 w-full">
                Continue with Discord <BsDiscord size={24} />
              </Button>
            </Link>
          </div>
        </form>
      </Card>
      <p className="text-sm text-center whitespace-pre-line">
        {messages.login.DONT_HAVE_ACCOUNT}{" "}
        <LocaleLink
          className="text-blue-700 hover:text-blue-800"
          href={`/auth/signup`}
        >
          {messages.login.SIGNUP_NOW}
        </LocaleLink>{" "}
      </p>
    </div>
  );
};

export default LoginCard;
