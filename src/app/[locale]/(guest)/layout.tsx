import { getProfile } from "@/app/utils/server/user";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const user = await getProfile();
  if (user) redirect(`/${props.params.locale}/rooms`);
  return <>{props.children}</>;
};

export default Layout;
