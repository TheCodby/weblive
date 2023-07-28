import { getMyProfile } from "@/app/utils/server/user";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const user = await getMyProfile();
  if (user) redirect(`/${props.params.locale}/rooms`);
  return <>{props.children}</>;
};

export default Layout;
