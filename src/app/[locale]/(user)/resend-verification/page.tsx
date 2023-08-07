import React from "react";
import { getDictionary } from "@/dictionaries";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/app/utils/server/user";
import Card from "../../components/ui/card";
import ResendButton from "../components/resend-button";
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
    title: dict.resendVerification.TITLE,
  };
}
const ResendPage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  const profile = await getMyProfile();
  if (profile?.verified) {
    redirect(`/${params.locale}/rooms`);
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center absolute w-full h-full p-4 lg:p-0">
      <Card className="flex flex-col gap-4 lg:w-1/2">
        <Card.Header className="p-4 text-xl font-bold">
          {dict.resendVerification.TITLE}
        </Card.Header>
        <div className="p-4 flex flex-col gap-3">
          <p className="text-xl font-medium text-center">
            {dict.resendVerification.DESCRIPTION.replace(
              ":email",
              profile?.email
            )}
          </p>
          <div className="flex flex-row justify-center">
            <ResendButton dict={dict} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResendPage;
