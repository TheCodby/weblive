"use client";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "../../components/loading";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import LocaleLink from "@/app/[locale]/components/locale-link";
import useLocale from "@/app/hooks/useLocale";
import { setCookie } from "cookies-next";
import Button from "../../components/ui/button";
import TextInput from "../../components/ui/text-input";
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
      localStorage.setItem("token", data.token);
      setCookie("token", data.token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //
      });
      localStorage.setItem(
        "picture",
        `${process.env.NEXT_PUBLIC_API}${data?.user?.picture}`
      );
      router.push(`/${locale}/rooms`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="card p-6 rounded-3xl justify-center text-center m-4">
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
        </form>
      </div>
      <p className="text-sm text-center whitespace-pre-line">
        {messages.login.DONT_HAVE_ACCOUNT}{" "}
        <LocaleLink
          className="text-blue-700 hover:text-blue-800"
          href={`/signup`}
        >
          {messages.login.SIGNUP_NOW}
        </LocaleLink>{" "}
      </p>
    </div>
  );
};

export default LoginCard;
