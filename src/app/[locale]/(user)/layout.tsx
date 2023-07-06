import { getUserByToken } from "@/app/utils/server/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
const Layout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  const loggedin = getUserByToken(token?.value.toString());
  if (!loggedin) redirect(`/${props.params.locale}/login`);
  return <>{props.children}</>;
};

export default Layout;
