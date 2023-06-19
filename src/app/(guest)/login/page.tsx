import GuestJoin from "@/app/components/guest-join";
import LoginCard from "@/app/(guest)/login/login-card";
import PageWraper from "@/app/components/page-wrapper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `${process.env.APP_NAME} - Login`,
  description: "Login to your account",
};

export default function Home() {
  return (
    <PageWraper className="flex flex-col md:flex-row gap-4 justify-center items-center absolute w-full h-full">
      <LoginCard />
      <GuestJoin />
    </PageWraper>
  );
}
