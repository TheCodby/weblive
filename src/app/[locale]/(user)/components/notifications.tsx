"use client";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoNotifications } from "react-icons/io5";
import Card from "../../components/ui/card";
import Loading from "../../components/loading";
import { INotif } from "@/app/interfaces/notification";
import {
  useNotificationNumbers,
  useNotifications,
} from "@/app/hooks/useNotifications";
import LocaleLink from "../../components/locale-link";
interface Props {
  messages: any;
}
const Notifications = React.forwardRef(({ messages }: Props, ref) => {
  const notifications = useNotifications();
  const notificationNumbers = useNotificationNumbers();

  const read = (e: React.FormEvent) => {
    notifications.refetch();
  };
  if (notifications.isError) return null;
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        onClick={read}
        className="flex items-center rounded-full hover:scale-110 hover:dark:bg-neutral-800 p-2 transition-all duration-300"
      >
        <IoNotifications className="w-5 h-5" />
        {notificationNumbers.data! > 0 ? (
          <div className="absolute top-[0.2rem] end-1 rounded-full dark:bg-red-700 w-3 h-3"></div>
        ) : null}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dark:text-white absolute right-0 w-56 lg:w-96 lg:end-0 mt-4 lg:origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Card className="flex flex-col gap-2 p-2">
            {notifications.isFetching || notifications.isLoading ? (
              <div className="self-center">
                <Loading />
              </div>
            ) : null}
            {notifications.isSuccess ? (
              notifications.data!.length > 0 ? (
                notifications.data!.map(
                  (notification: INotif, index: number) => (
                    <Menu.Item key={index}>
                      <LocaleLink
                        href={notification.url!}
                        className="p-2 dark:bg-neutral-800 hover:dark:bg-neutral-700 hover:bg-neutral-300 rounded-lg transition-all duration-300  "
                      >
                        <p>{notification.message}</p>
                      </LocaleLink>
                    </Menu.Item>
                  )
                )
              ) : (
                <p className="text-center p-3">No notifications found.</p>
              )
            ) : null}
          </Card>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
Notifications.displayName = "Notifications";
export default Notifications;
