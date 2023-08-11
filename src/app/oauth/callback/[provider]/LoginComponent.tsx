"use client";
import { handleLogin } from "@/app/utils/user";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";

interface Props {
  data: any;
  type: "login" | "connect";
}
const LoginComponent: React.FC<Props> = ({ data, type }) => {
  const router = useRouter();
  useEffect(() => {
    if (type === "login") {
      handleLogin(data);
    }

    setTimeout(() => {
      if (type === "connect") router.push("/en/rooms");
      else if (type === "login") router.push("/en/auth/login");
    }, 3000);
  }, []);
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
