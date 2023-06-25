import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import { getDictionary } from "@/dictionaries";
import { getUserByToken } from "@/app/utils/user";
import { cookies } from "next/headers";
import ProfileSettings from "./components/profile-settings";
import ProfilePicture from "./components/profile-picture";
import ChangePassword from "./components/change-password";

const AccountPage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  const cookieStore = cookies();
  const token = cookieStore.get("token")!;
  const user = await getUserByToken(token?.value.toString());
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4">
        <dl className="flex flex-col gap-2">
          <dt className="text-2xl dark:text-neutral-100 text-neutral-800 flex flex-col">
            <p>{dict.settings.account.PROFILE_SETTINGS}</p>
          </dt>
          <dd>
            <ProfileSettings messages={dict} user={user} />
          </dd>
        </dl>
        <dl className="flex flex-col gap-2">
          <dt className="text-2xl dark:text-neutral-100 text-neutral-800 flex flex-col">
            <p>{dict.settings.account.CHANGE_PASSWORD}</p>
          </dt>
          <dd>
            <ChangePassword messages={dict} />
          </dd>
        </dl>
        <dl className="flex flex-col gap-2">
          <dt className="text-2xl dark:text-neutral-100 text-neutral-800">
            {dict.settings.account.PROFILE_PICTURE}
          </dt>
          <dd>
            <ProfilePicture messages={dict} user={user} />
          </dd>
        </dl>
      </div>
    </PageWrapper>
  );
};

export default AccountPage;
