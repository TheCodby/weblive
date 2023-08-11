"use client";
import useLocale from "@/app/hooks/useLocale";
import { handleLogin } from "@/app/utils/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";

interface Props {
  data: any;
}
const LoginComponent: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    handleLogin(data);

    setTimeout(() => {
      router.push(`/${locale}/rooms`);
    }, 3000);
  }, [data, locale, router]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 text-center justify-center items-center">
        <ImCheckmark size={128} color="#03bc03" />
        <p className="text-4xl font-black">Authorized</p>
        <p className="text-2xl">You{`'`}ll be redirected in 3 seconds.</p>
      </div>
    </div>
  );
};

export default LoginComponent;
