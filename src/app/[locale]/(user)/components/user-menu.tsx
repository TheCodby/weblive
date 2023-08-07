"use client";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FiSettings } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { IoRadioOutline } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import LocaleLink from "../../components/locale-link";
import Image from "next/image";
import { User } from "@/app/interfaces/user";
import Card from "../../components/ui/card";
interface Props {
  messages: any;
  user: User;
}
const UserMenu = React.forwardRef(({ messages, user }: Props, ref) => {
  const router = useRouter();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    deleteCookie("token");
    router.refresh();
  };
  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <Menu.Button className="flex items-center rounded-full hover:opacity-40 hover:dark:bg-neutral-800 p-2 transition-all duration-300">
        <div className="w-5 h-5 overflow-hidden">
          <Image
            fill
            src={user.avatar}
            className="rounded-full border border-neutral-200 dark:border-neutral-700"
            alt=""
          />
        </div>
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
        <Menu.Items className="dark:text-white absolute w-56 end-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Card className="flex flex-col gap-1 p-1">
            <Menu.Item>
              <LocaleLink
                href={`/profile/${user.username}`}
                className="border-b dark:border-neutral-700 pb-1"
              >
                <div className="flex flex-row items-center gap-2 p-2 dark:hover:bg-neutral-700 transition-all duration-200 rounded-md ">
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
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <LocaleLink
                  href={`/rooms`}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 text-sm ${
                    active ? "bg-blue-500 dark:bg-blue-700 text-white" : ""
                  }`}
                >
                  <IoRadioOutline className="me-2 h-5" /> {messages.ROOMS}
                </LocaleLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <LocaleLink
                  href={`/settings/profile`}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 text-sm ${
                    active ? "bg-blue-500 dark:bg-blue-700 text-white" : ""
                  }`}
                >
                  <FiSettings className="me-2 h-5" /> {messages.SETTINGS}
                </LocaleLink>
              )}
            </Menu.Item>
            {user.admin && (
              <Menu.Item>
                {({ active }) => (
                  <LocaleLink
                    href={`/admin`}
                    className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 text-sm ${
                      active ? "bg-blue-500 dark:bg-blue-700 text-white" : ""
                    }`}
                  >
                    <MdAdminPanelSettings className="me-2 h-5" />{" "}
                    {messages.ADMIN}
                  </LocaleLink>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 text-sm ${
                    active ? "bg-blue-500 dark:bg-blue-700 text-white" : ""
                  }`}
                >
                  <IoMdLogOut className="me-2 h-5" /> {messages.LOGOUT}
                </button>
              )}
            </Menu.Item>
          </Card>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});
UserMenu.displayName = "UserMenu";
export default UserMenu;
