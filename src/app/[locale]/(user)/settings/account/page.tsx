import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import AccountSettings from "../components/account-settings";
import { getDictionary } from "@/dictionaries";

const AccountPage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  return (
    <PageWrapper className="w-full h-full">
      <AccountSettings messages={dict.settings.account} />
    </PageWrapper>
  );
};

export default AccountPage;
