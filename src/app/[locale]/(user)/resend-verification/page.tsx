import React from "react";
import { getDictionary } from "@/dictionaries";
import { redirect } from "next/navigation";
import { getMyProfile } from "@/app/utils/server/user";
import Card from "../../components/ui/card";
import ResendButton from "../components/resend-button";

const CompletePage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  const profile = await getMyProfile();
  if (profile?.verified) {
    redirect(`/${params.locale}/rooms`);
  }
  return (
    <div className="flex flex-col gap-4 justify-center items-center absolute w-full h-full">
      <Card className="flex flex-col gap-4 lg:w-1/2">
        <h1 className="text-md bg-neutral-800 p-4 text-xl font-bold">
          {dict.resendVerification.TITLE}
        </h1>
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

export default CompletePage;
