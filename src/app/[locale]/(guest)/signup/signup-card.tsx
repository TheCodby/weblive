"use client";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "../../components/loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LocaleLink from "../../components/locale-link";
import useLocale from "@/app/hooks/useLocale";
import Button from "../../components/ui/button";
import TextInput from "../../components/ui/text-input";
const SignupCard = ({ messages }: { messages: any }) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const router = useRouter();
  const sendSignupRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, password: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast(data.message, {
        type: "success",
      });
      router.push(`/${locale}/login`);
    } catch (err: any) {
      setError(err.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="card p-6 rounded-3xl justify-center text-center m-4 md:w-96">
        <p className="dark:text-slate-200 tracking-tight font-black text-slate-900 mt-1 text-3xl">
          {messages.signup.JOIN_NOW}
        </p>
        <form
          autoComplete="off"
          className="flex flex-col mt-6 gap-4"
          onSubmit={sendSignupRequest}
        >
          <TextInput
            icon={<FaUserAlt />}
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
            <Button className="w-1/2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loading />
                  {messages.main.LOADING}
                </>
              ) : (
                messages.signup.SIGNUP
              )}
            </Button>
          </div>
        </form>
      </div>
      <p className="text-sm text-center">
        {messages.signup.ALREADY_HAVE_ACCOUNT}{" "}
        <LocaleLink
          className="text-blue-700 hover:text-blue-800"
          href={`/login`}
        >
          {messages.signup.LOGIN_NOW}
        </LocaleLink>{" "}
      </p>
    </div>
  );
};

export default SignupCard;
