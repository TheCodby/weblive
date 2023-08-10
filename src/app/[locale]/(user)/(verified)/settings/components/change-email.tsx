"use client";
import Loading from "@/app/[locale]/components/loading";
import Button from "@/app/[locale]/components/ui/button";
import Card from "@/app/[locale]/components/ui/card";
import TextInput from "@/app/[locale]/components/ui/text-input";
import { getUserTheme } from "@/app/utils/theme";
import { changeEmail } from "@/app/utils/user";
import { changeEmailSchema } from "@/app/utils/validations/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangeEmail = ({ messages, email }: { messages: any; email: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>({
    defaultValues: {
      email: email,
    },
    resolver: yupResolver(changeEmailSchema),
  });
  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      const res = await changeEmail(data.email, localStorage.getItem("token")!);
      toast(res.message, {
        type: "success",
        theme: getUserTheme(),
      });
      router.refresh();
    } catch (err: any) {
      setError("email", {
        type: "manual",
        message: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 justify-start items-start"
    >
      <label className="block">
        <span className="block text-sm font-medium text-neutral-400">
          {messages.user.EMAIL}
        </span>
        <TextInput
          error={errors.email?.message}
          {...register("email", { required: true })}
          type="email"
        />
        <p className="mt-2 invisible peer-invalid:visible text-red-600 text-xs"></p>
      </label>
      <Button type="submit" disabled={isLoading} variant="primary">
        {isLoading ? (
          <>
            <Loading /> {messages.main.LOADING}
          </>
        ) : (
          messages.settings.privacy.CHANGE_EMAIL
        )}
      </Button>
    </form>
  );
};

export default ChangeEmail;
