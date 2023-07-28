import React from "react";
import LocalesMenu from "./locales-menu";
import dynamic from "next/dynamic";
import LocaleLink from "./locale-link";
import { getDictionary } from "@/dictionaries";
import UserMenu from "../(user)/components/user-menu";
import Button from "./ui/button";
import Notifications from "../(user)/components/notifications";
import { User } from "@/app/interfaces/user";
const ToggleTheme = dynamic(() => import("./toggle-theme"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-6 h-6 dark:bg-slate-700 bg-gray-300 rounded-full m-2"></div>
  ),
});
const Header = async ({ user, locale }: { user: User; locale: string }) => {
  const dict = await getDictionary(locale);
  return (
    <nav className="flex flex-row p-2 justify-between items-center bg-white dark:bg-neutral-900 shadow-sm w-full z-[11] h-14 sticky">
      <div className="flex flex-row gap-4 items-center">
        <LocaleLink
          href="/"
          className="text-black dark:text-white text-2xl font-black hover:text-blue-500 hover:dark:text-blue-700"
        >
          WebLive
        </LocaleLink>
        <ToggleTheme />
        <LocalesMenu />
      </div>
      <div>
        {user ? (
          <div className="flex flex-row gap-4 items-center">
            <Notifications />
            <UserMenu messages={dict.user} user={user} />
          </div>
        ) : (
          <LocaleLink href="/auth/login">
            <Button variant="primary">{dict.login.LOGIN}</Button>
          </LocaleLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
