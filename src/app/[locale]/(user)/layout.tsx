import { getMyProfile } from "@/app/utils/server/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
const Layout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const user = await getMyProfile();
  const pathname = headers().get("x-pathname");
  if (!user) redirect(`/${props.params.locale}/auth/login`);
  if (!user?.completed && !pathname?.endsWith("/complete"))
    redirect(`/${props.params.locale}/complete`);
  return <>{props.children}</>;
};

export default Layout;
