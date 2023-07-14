import { User } from "@/app/interfaces/user";
import { getUserByToken } from "@/app/utils/server/user";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
const AdminLayout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  const user = getUserByToken(token?.value.toString()) as User;
  if (!user.admin) notFound();
  return <>{props.children}</>;
};

export default AdminLayout;
