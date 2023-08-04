"use client";
import "@/app/[locale]/globals.css";
import LoadingComponent from "@/app/[locale]/loading";
import { inter } from "@/app/fonts";
import useLocale from "@/app/hooks/useLocale";
import { verify } from "@/app/utils/user";
import { NextPage } from "next";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { ImCheckmark } from "react-icons/im";

interface Props {
  params: { locale: string; provider: string };
  searchParams: { code: string };
}
const VerifyPage: NextPage<Props> = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string>();
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  useEffect(() => {
    const handleVerify = async () => {
      try {
        await verify(searchParams.get("code")!);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        setError(e.message);
      } finally {
        setTimeout(() => {
          router.push(`/auth/login`);
        }, 3000);
      }
    };
    if (searchParams.has("code")) handleVerify();
    else {
      setIsLoading(false);
      setError("No code provided");
      setTimeout(() => {
        router.push(`/auth/login`);
      }, 3000);
    }
  }, [params.provider, searchParams, locale, router]);
  return (
    <html>
      <body
        className={`h-full w-full bg-neutral-900 flex flex-col justify-center items-center text-white ${inter.className}`}
      >
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex flex-col gap-2 text-center justify-center items-center">
              <p className="text-4xl font-black">Verifying</p>
              <LoadingComponent />
            </div>
          ) : error ? (
            <div className="flex flex-col gap-2 text-center justify-center items-center">
              <p className="text-4xl font-black">{error}</p>
              <p className="text-2xl">
                You{`'`}ll be redirected to the login page in 3 seconds.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-center justify-center items-center">
              <ImCheckmark size={128} color="#03bc03" />
              <p className="text-4xl font-black">Verified</p>
              <p className="text-2xl">
                You{`'`}ll be redirected to the login page in 3 seconds.
              </p>
            </div>
          )}
        </div>
      </body>
    </html>
  );
};

export default VerifyPage;
