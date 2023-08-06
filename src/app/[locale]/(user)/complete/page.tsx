import React from "react";
import AddPassword from "./components/add-password";
import { getDictionary } from "@/dictionaries";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/app/utils/server/user";
import { Metadata } from "next";
export async function generateMetadata({
  params,
}: {
  params: {
    locale: string;
  };
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale);

  return {
    title: dict.completeAccount.TITLE,
  };
}
const CompletePage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  const profile = await getMyProfile();
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
