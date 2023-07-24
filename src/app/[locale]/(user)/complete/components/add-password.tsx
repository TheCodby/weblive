"use client";
import Loading from "@/app/[locale]/components/loading";
import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
import TextInput from "@/app/[locale]/components/ui/text-input";
import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useLocale from "@/app/hooks/useLocale";
import { getUserTheme } from "@/app/utils/theme";
type Inputs = {
  password: string;
  confirmPassword: string;
};
const AddPassword = ({ messages }: { messages: any }) => {
  const router = useRouter();
  const locale = useLocale();
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    const formData = data;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/me/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        } as Inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message, {
        theme: getUserTheme(),
      });
      router.push(`/${locale}/rooms`);
    } catch (e: any) {
      toast.error(e.message, {
        theme: getUserTheme(),
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-1/2">
      <p className="text-md bg-neutral-800 p-4">
        We noticed that you{`'`}ve chosen to log in using your [Discord/Google]
        account. To enhance the security of your account and allow you to access
        your account independently, we require you to set a unique password.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-5 justify-start items-start"
      >
        <label className="block">
          <span className="block text-sm font-medium text-neutral-400">
            {messages.settings.account.NEW_PASSWORD}
          </span>
          <TextInput
            type="password"
            {...register("password", { required: true })}
            error={errors.password?.message}
          />
          <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-neutral-400">
            {messages.settings.account.CONFIRM_PASSWORD}
          </span>
          <TextInput
            type="password"
            {...register("confirmPassword", {
              required: true,
            })}
            error={errors.confirmPassword?.message}
          />
          <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
        </label>
        <Button type="submit" disabled={isLoading} variant="primary">
          {isLoading ? (
            <>
              <Loading /> {messages.main.LOADING}
            </>
          ) : (
            messages.main.SAVE_CHANGES
          )}
        </Button>
      </form>
    </Card>
  );
};

export default AddPassword;
