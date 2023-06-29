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
import { useRecoilState } from "recoil";
import { decodeToken, getUserByToken } from "@/app/utils/user";
const LoginCard = ({ messages }: { messages: any }) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();
  const sendLoginRequest = async (e: any) => {
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
      const userData = decodeToken(data.token);
      localStorage.setItem(
        "picture",
        `${process.env.NEXT_PUBLIC_API}${userData?.picture}`
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
          autoComplete="off"
          className="flex flex-col mt-6 gap-4"
          onSubmit={sendLoginRequest}
        >
          <div>
            <div className="input-group">
              <div className="image">
                <FaUserAlt />
              </div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder={messages.user.USERNAME}
                className={`${error ? "invalid" : ""}`}
                disabled={isLoading}
                required
              />
            </div>
            {error ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <label className="invalid-feedback">{error}</label>
              </motion.div>
            ) : null}
          </div>
          <div className="input-group">
            <div className="image">
              <RiLockPasswordFill />
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={messages.user.PASSWORD}
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <button type="submit" className="w-1/2 btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loading />
                  {messages.main.LOADING}
                </>
              ) : (
                messages.login.LOGIN
              )}
            </button>
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
