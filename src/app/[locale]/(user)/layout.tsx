"use client";
import React from "react";
import Loading from "../components/loading";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoading, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (localStorage.getItem("token")) {
        const res = await fetch("http://127.0.0.1:3001/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          router.push("/login");
          throw new Error(data.message);
        }
        return data;
      } else {
        router.push("/login");
        throw new Error("You are not logged in");
      }
    },
  });
  if (isLoading) return <Loading />;
  if (isSuccess) {
    return <>{children}</>;
  }
};

export default Layout;
