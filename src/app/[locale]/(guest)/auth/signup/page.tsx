import React from "react";
import SignupCard from "./signup-card";
import PageWrapper from "@/app/[locale]/components/page-wrapper";
import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.signup.TITLE,
  };
}
const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  const dict = await getDictionary(locale);
  return (
    <PageWrapper className="flex flex-col md:flex-row gap-4 justify-center items-center absolute w-full h-full">
      <SignupCard messages={dict} />
    </PageWrapper>
  );
};

export default page;
