"use client";
import React from "react";
import Button from "../../components/ui/button";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import useLocale from "@/app/hooks/useLocale";

type status = "idle" | "loading";
const ResendButton: React.FC<{ dict: any }> = ({ dict }) => {
  const [status, setLoading] = React.useState<status>("idle");
  const locale = useLocale();
  const handleResend = async () => {
    try {
      setLoading("loading");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/me/resend-verification?locale=${locale}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      toast.success(data.message, {
        theme: getUserTheme(),
      });
    } catch (e: any) {
      toast.error(e.message, {
        theme: getUserTheme(),
      });
    } finally {
      setLoading("idle");
    }
  };
  return (
    <Button
      variant="secondary"
      onClick={handleResend}
      disabled={status === "loading"}
    >
      {status === "loading"
        ? dict.main.LOADING
        : dict.resendVerification.RESEND}
    </Button>
  );
};

export default ResendButton;
