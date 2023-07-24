import React from "react";
import AddPassword from "./components/add-password";
import { getDictionary } from "@/dictionaries";
import { redirect } from "next/navigation";
import { getProfile } from "@/app/utils/server/user";

const CompletePage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  const profile = await getProfile();
  if (profile?.completed) {
    redirect(`/${params.locale}/rooms`);
  }
  return (
    <div className="p-6">
      <AddPassword messages={dict} />
    </div>
  );
};

export default CompletePage;
