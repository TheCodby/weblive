"use client";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { IoRadioOutline } from "react-icons/io5";
import LocaleLink from "../../components/locale-link";
const UserMenu = ({ messages }: { messages: any }) => {
  const router = useRouter();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    deleteCookie("token");
    router.refresh();
  };
  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <Menu.Button className="flex items-center rounded-full hover:bg-neutral-200 hover:dark:bg-neutral-800 p-2 transition-all duration-300">
        <FaUserCircle size={24} />
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
        <Menu.Items className="dark:text-white absolute w-36 end-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <LocaleLink
                  href={`/rooms`}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 ${
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
                  href={`/settings/account`}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 ${
                    active ? "bg-blue-500 dark:bg-blue-700 text-white" : ""
                  }`}
                >
                  <FiSettings className="me-2 h-5" /> {messages.SETTINGS}
                </LocaleLink>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 ${
                    active ? "bg-blue-500 dark:bg-blue-700 text-white" : ""
                  }`}
                >
                  <IoMdLogOut className="me-2 h-5" /> {messages.LOGOUT}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
