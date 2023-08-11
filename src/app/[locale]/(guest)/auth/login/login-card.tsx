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
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import { authLoginSchema } from "@/app/utils/validations/auth";
import { IAuth } from "@/app/interfaces/user";
import { Separator } from "@/app/[locale]/components/ui/separator";
const LoginCard = ({ messages }: { messages: any }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<IAuth>({
    values: {
      username: "",
      password: "",
    },
    resolver: yupResolver(authLoginSchema),
  });
  const locale = useLocale();
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message);
      handleLogin(resData);
      router.push(`/${locale}/rooms`);
      router.refresh();
      toast.success(messages.login.LOGIN_SUCCESS, {
        theme: getUserTheme(),
      });
    } catch (err: any) {
      setError("username", {
        type: "manual",
        message: err.message,
      });
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
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="on"
        >
          <TextInput
            icon={<FaUserAlt />}
            autoComplete="username"
            type="text"
            placeholder={messages.user.USERNAME}
            error={errors.username?.message}
            value={watch("username")}
            animatedPlaceholder
            {...register("username", {
              required: true,
              disabled: isLoading,
              minLength: 3,
              maxLength: 20,
              pattern: /^[a-zA-Z0-9]+$/,
            })}
          />
          <TextInput
            icon={<RiLockPasswordFill />}
            autoComplete="current-password"
            type="password"
            placeholder={messages.user.PASSWORD}
            required
            error={errors.password?.message}
            value={watch("password")}
            animatedPlaceholder
            {...register("password", {
              required: true,
              disabled: isLoading,
              minLength: 3,
              maxLength: 20,
              pattern: /^[a-zA-Z0-9]+$/,
            })}
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
          <Separator />
          <div className="flex flex-col gap-4">
            <Link
              href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_WEB}/${locale}/oauth/callback/google&response_type=code&scope=openid%20profile%20email`}
            >
              <Button className="w-full inline-flex gap-2 p-3">
                <svg
                  className="h-6 w-6"
                  width="800px"
                  height="800px"
                  viewBox="-3 0 262 262"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <path
                      d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479"
                      fill="#EB4335"
                    ></path>
                  </g>
                </svg>
                <p>Continue with Google</p>
              </Button>
            </Link>
            <Link
              href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_WEB}/${locale}/oauth/callback/discord&response_type=code&scope=identify%20email`}
            >
              <Button className="w-full inline-flex gap-2 p-3">
                <svg
                  className="h-6 w-6"
                  width="800px"
                  height="800px"
                  viewBox="0 -28.5 256 256"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  preserveAspectRatio="xMidYMid"
                >
                  <g>
                    <path
                      d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"
                      fill="#5865F2"
                      fill-rule="nonzero"
                    ></path>
                  </g>
                </svg>{" "}
                <p className="hidden lg:block">Continue with Discord</p>
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
