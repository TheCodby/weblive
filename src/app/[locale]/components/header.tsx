import React from "react";
import LocalesMenu from "./locales-menu";
import dynamic from "next/dynamic";
import LocaleLink from "./locale-link";
import { getDictionary } from "@/dictionaries";
import Button from "./ui/button";
import Notifications from "../(user)/components/notifications";
import { User } from "@/app/interfaces/user";
import UserMenu from "../(user)/components/user-menu";
import SearchRooms from "./search-rooms";
import { getRooms } from "@/app/utils/room";
import { User as UserIcon } from "lucide-react";
const ToggleTheme = dynamic(() => import("./toggle-theme"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-6 h-6 dark:bg-slate-700 bg-gray-300 rounded-full m-2"></div>
  ),
});
const Header = async ({ user, locale }: { user: User; locale: string }) => {
  const dict = await getDictionary(locale);
  const rooms = await getRooms("1");
  return (
    <nav className="flex flex-row p-2 justify-between items-center bg-white dark:bg-neutral-900 shadow-sm w-full z-[11] h-14 fixed lg:sticky">
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
      <div className="flex flex-row gap-4 items-center">
        <SearchRooms messages={dict} initialRooms={rooms} />
        {user ? (
          <>
            <Notifications messages={dict} />
            <UserMenu messages={dict.user} user={user} />
          </>
        ) : (
          <>
            <LocaleLink href="/auth/login" className="flex items-center">
              <Button variant="primary" className="hidden lg:block">
                {dict.login.LOGIN}
              </Button>
              <button className="lg:hidden">
                <UserIcon size={20} />
              </button>
            </LocaleLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
