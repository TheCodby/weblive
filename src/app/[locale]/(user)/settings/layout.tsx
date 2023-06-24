import React from "react";
import Navbar from "./components/navbar";
import { getDictionary } from "@/dictionaries";
const layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = await getDictionary(params.locale);
  return (
    <div className="flex flex-col gap-2 justify-between p-10 ">
      <aside className="basis-1/3">
        <Navbar messages={messages} />
      </aside>
      <div className="basis-2/3">{children}</div>
    </div>
  );
};

export default layout;
