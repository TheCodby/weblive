import React from "react";
import LocaleLink from "../../components/locale-link";
import Image from "next/image";
import { User } from "@/app/interfaces/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/[locale]/components/ui/dropdown-menu";
import { Airplay, Lock, LogOut, Settings } from "lucide-react";
import LogoutButton from "../../components/logout-button";

interface Props {
  messages: any;
  user: User;
}
const UserMenu: React.FC<Props> = ({ messages, user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center hover:opacity-40 hover:dark:bg-neutral-800 p-2 transition-all duration-300 w-7 h-7 overflow-hidden rounded-full relative">
          <Image
            fill
            src={user.avatar}
            className="rounded-full border border-neutral-200 dark:border-neutral-700"
            alt=""
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <LocaleLink href={`/profile/${user.username}`}>
              <div className="flex flex-row items-center gap-2 rounded-md ">
                <div className="relative w-10 h-10 overflow-hidden">
                  <Image
                    fill
                    src={user.avatar}
                    className="rounded-full border border-neutral-200 dark:border-neutral-700"
                    alt=""
                    objectFit="cover"
                  />
                </div>
                <p className="font-semibold text-md">{user.username}</p>
              </div>
            </LocaleLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <LocaleLink href={`/rooms`}>
              <Airplay className="mr-2 h-4 w-4" /> {messages.ROOMS}
            </LocaleLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <LocaleLink href={`/settings/profile`}>
              <Settings className="mr-2 h-4 w-4" /> {messages.SETTINGS}
            </LocaleLink>
          </DropdownMenuItem>
          {user.admin && (
            <DropdownMenuItem asChild>
              <LocaleLink href={`/admin`}>
                <Lock className="mr-2 h-4 w-4" /> {messages.ADMIN}
              </LocaleLink>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <LogoutButton className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> {messages.LOGOUT}
            </LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserMenu;
