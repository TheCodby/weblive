import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import { getDictionary } from "@/dictionaries";
import ChangePassword from "../components/change-password";
import { Metadata } from "next";
import { getProfile } from "@/app/utils/server/user";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.settings.privacy.TITLE,
  };
}
const AccountPage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 lg:w-1/2">
        <dl className="flex flex-col gap-2">
          <dt className="font-bold text-3xl dark:text-neutral-100 text-neutral-800 flex flex-col">
            <p>{dict.settings.privacy.CHANGE_PASSWORD}</p>
          </dt>
          <dd>
            <ChangePassword messages={dict} />
          </dd>
        </dl>
      </div>
    </PageWrapper>
  );
};

export default AccountPage;
