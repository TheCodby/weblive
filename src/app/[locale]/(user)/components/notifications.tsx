"use client";
import React from "react";
import { INotif } from "@/app/interfaces/notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/[locale]/components/ui/dropdown-menu";
import { useNotifications } from "@/app/hooks/useNotifications";
import LocaleLink from "../../components/locale-link";
import { Bell, BellRing } from "lucide-react";
interface Props {
  messages: any;
}
const Notifications: React.FC<any> = ({ messages }) => {
  const { notifications, isShown, setIsShown } = useNotifications();
  return (
    <DropdownMenu
      onOpenChange={(isOpen) => {
        if (isOpen) {
          setIsShown(true);
        }
      }}
    >
      <DropdownMenuTrigger className="flex items-center rounded-full hover:scale-110 hover:dark:bg-neutral-800 p-2 transition-all duration-300">
        {!isShown ? (
          <BellRing className="w-5 h-5" fill="white" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 max-h-96 overflow-auto">
        <DropdownMenuGroup>
          {notifications.length > 0 ? (
            notifications!.map((notification: INotif, index: number) => (
              <>
                {index > 0 ? <DropdownMenuSeparator /> : null}
                <DropdownMenuItem
                  key={index}
                  asChild
                  className="p-3 flex flex-row items-center space-x-2"
                >
                  <LocaleLink href={notification.url!}>
                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                    <p>{notification.message}</p>
                  </LocaleLink>
                </DropdownMenuItem>
              </>
            ))
          ) : (
            <DropdownMenuLabel className="text-center font-black p-4">
              No notifications found.
            </DropdownMenuLabel>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
Notifications.displayName = "Notifications";
export default Notifications;
