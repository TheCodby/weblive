import { getMyProfile } from "@/app/utils/server/user";
import { notFound } from "next/navigation";
import React from "react";
const AdminLayout = async (props: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const user = await getMyProfile();
  if (!user.admin) notFound();
  return <>{props.children}</>;
};

export default AdminLayout;
