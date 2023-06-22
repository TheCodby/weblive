import React from "react";
import LocalesMenu from "./locales-menu";
import dynamic from "next/dynamic";
const ToggleTheme = dynamic(() => import("./ToggleTheme"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-6 h-6 dark:bg-slate-700 bg-gray-300 rounded-full m-2"></div>
  ),
});
const Header = () => {
  return (
    <header className="flex flex-row gap-4 p-2 items-center">
      <ToggleTheme />
      <LocalesMenu />
    </header>
  );
};

export default Header;
