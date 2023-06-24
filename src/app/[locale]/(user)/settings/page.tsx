import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
import React from "react";
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.settings.TITLE,
  };
}
const page = () => {
  return <div>page</div>;
};

export default page;
