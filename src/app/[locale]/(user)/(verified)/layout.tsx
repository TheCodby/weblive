import { User } from "@/app/interfaces/user";
import { getMyProfile } from "@/app/utils/server/user";
import { redirect } from "next/navigation";
import React from "react";
const Layout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const user: User = await getMyProfile();
  if (!user.completed) redirect(`/${props.params.locale}/complete`);
  if (!user.verified) redirect(`/${props.params.locale}/resend-verification`);
  return <>{props.children}</>;
};

export default Layout;
