"use client";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React from "react";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const LogoutButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    const router = useRouter();
    const handleLogout = async () => {
      console.log("fvdvfdvfdg");
      localStorage.removeItem("token");
      deleteCookie("token");
      router.refresh();
    };
    return (
      <button onClick={handleLogout} {...props}>
        {children}
      </button>
    );
  }
);
LogoutButton.displayName = "LogoutButton";
export default LogoutButton;
