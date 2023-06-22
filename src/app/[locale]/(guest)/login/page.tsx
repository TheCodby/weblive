import GuestJoin from "./components/guest-join";
import LoginCard from "./components/login-card";
import PageWraper from "../../components/page-wrapper";
import { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
export const metadata: Metadata = {
  title: `${process.env.APP_NAME} - Login`,
  description: "Login to your account",
};

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);
  return (
    <PageWraper className="flex flex-col md:flex-row gap-4 justify-center items-center absolute w-full h-full">
      <LoginCard messages={dict} />
      <GuestJoin messages={dict} />
    </PageWraper>
  );
}
