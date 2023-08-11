"use client";
import React from "react";
import Loading from "../../components/loading";
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
import {
  useNotificationNumbers,
  useNotifications,
} from "@/app/hooks/useNotifications";
import LocaleLink from "../../components/locale-link";
import { Bell, BellPlus, BellRing } from "lucide-react";
interface Props {
  messages: any;
}
const Notifications: React.FC<any> = ({ messages }) => {
  const notifications = useNotifications();
  const notificationNumbers = useNotificationNumbers();
  if (notifications.isError) return null;
  return (
    <DropdownMenu
      onOpenChange={(isOpen) => {
        if (isOpen) {
          notifications.refetch();
        }
      }}
    >
      <DropdownMenuTrigger className="flex items-center rounded-full hover:scale-110 hover:dark:bg-neutral-800 p-2 transition-all duration-300">
        {notificationNumbers.data! > 0 ? (
          <BellRing className="w-5 h-5" fill="white" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <DropdownMenuGroup>
          {notifications.isFetching || notifications.isLoading ? (
            <div className="self-center">
              <Loading />
            </div>
          ) : null}
          {notifications.isSuccess &&
          !notifications.isFetching &&
          !notifications.isLoading ? (
            notifications.data!.length > 0 ? (
              notifications.data!.map((notification: INotif, index: number) => (
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
            )
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
Notifications.displayName = "Notifications";
export default Notifications;
