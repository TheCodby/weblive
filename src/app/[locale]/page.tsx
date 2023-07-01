import { getDictionary } from "@/dictionaries";
import React from "react";
import PageWrapper from "./components/page-wrapper";

const HomePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const dict = await getDictionary(locale);
  return (
    <PageWrapper className="p-10 flex flex-col text-center">
      <h1 className="tracking-tighter text-7xl font-black">
        {dict.home.WELCOME_MESSAGE}{" "}
        <span className="text-blue-500 dark:text-blue-700">WebLive</span>
      </h1>
    </PageWrapper>
  );
};

export default HomePage;
