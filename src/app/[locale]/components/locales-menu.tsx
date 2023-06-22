"use client";
import useLocale from "@/app/hooks/useLocale";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import { US, AE } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { usePathname } from "next/navigation";
const LocalesMenu = () => {
  const locale = useLocale();
  const pathname = usePathname().split("/").slice(2).join("/");
  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <Menu.Button className="w-6 h-6 flex items-center">
        {locale === "en" ? <US /> : <AE />}
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
        <Menu.Items className="absolute right-0 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/en/${pathname}`}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 ${
                    active ? "scale-90 opacity-75" : "text-gray-900"
                  }`}
                >
                  <US className="w-6 h-6" />
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/ar/${pathname}`}
                  className={`group flex w-full items-center rounded-md px-2 py-2 transition-all duration-200 ${
                    active ? "scale-90 opacity-75" : "text-gray-900"
                  }`}
                >
                  <AE className="w-6 h-6" />
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LocalesMenu;
