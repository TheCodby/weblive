"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const RedirectComponent = ({ pathname }: { pathname: string }) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(pathname);
    }, 3000);
  }, []);
  return null;
};

export default RedirectComponent;
