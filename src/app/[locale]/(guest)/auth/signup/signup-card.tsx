"use client";
import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "@/app/[locale]/components/loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import LocaleLink from "@/app/[locale]/components/locale-link";
import useLocale from "@/app/hooks/useLocale";
import Button from "@/app/[locale]/components/ui/button";
import TextInput from "@/app/[locale]/components/ui/text-input";
import Card from "@/app/[locale]/components/ui/card";
import { getUserTheme } from "@/app/utils/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { authRegisterSchema } from "@/app/utils/validations/auth";
import { IRegister } from "@/app/interfaces/user";
import { HiOutlineMail } from "react-icons/hi";
import { signup } from "@/app/utils/user";
import { ApiError } from "@/app/utils/errors/api-errors";
const SignupCard = ({ messages }: { messages: any }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm<IRegister>({
    values: {
      username: "",
      password: "",
      email: "",
    },
    resolver: yupResolver(authRegisterSchema),
  });
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const sendSignupRequest: SubmitHandler<IRegister> = async (data) => {
    setIsLoading(true);
    try {
      const res = await signup(
        data.username,
        data.email,
        data.password,
        locale
      );
      toast(res.message, {
        type: "success",
        theme: getUserTheme(),
      });
      router.push(`/${locale}/auth/login`);
    } catch (err: any) {
      setError(err.data?.field || "username", {
        type: "manual",
        message: err.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <div>
      <Card className="p-6 rounded-3xl justify-center text-center m-4 lg:w-96">
        <p className="dark:text-slate-200 tracking-tight font-black text-slate-900 mt-1 text-3xl">
          {messages.signup.JOIN_NOW}
        </p>
        <form
          autoComplete="off"
          className="flex flex-col mt-6 gap-4"
          onSubmit={handleSubmit(sendSignupRequest)}
        >
          <TextInput
            icon={<FaUserAlt size={20} />}
            type="text"
            placeholder={messages.user.USERNAME}
            disabled={isLoading}
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
            icon={<HiOutlineMail size={20} />}
            type="text"
            placeholder={messages.user.EMAIL}
            disabled={isLoading}
            error={errors.email?.message}
            value={watch("email")}
            animatedPlaceholder
            {...register("email", {
              required: true,
              disabled: isLoading,
            })}
          />
          <TextInput
            icon={<RiLockPasswordFill size={20} />}
            type="password"
            placeholder={messages.user.PASSWORD}
            disabled={isLoading}
            required
            value={watch("password")}
            error={errors.password?.message}
            animatedPlaceholder
            {...register("password", {
              disabled: isLoading,
              minLength: 3,
              maxLength: 20,
              pattern: /^[a-zA-Z0-9]+$/,
            })}
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
      </Card>
      <p className="text-sm text-center">
        {messages.signup.ALREADY_HAVE_ACCOUNT}{" "}
        <LocaleLink
          className="text-blue-700 hover:text-blue-800"
          href={`/auth/login`}
        >
          {messages.signup.LOGIN_NOW}
        </LocaleLink>{" "}
      </p>
    </div>
  );
};

export default SignupCard;
