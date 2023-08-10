"use client";
import useLocale from "@/app/hooks/useLocale";
import React from "react";
import { US, AE } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/[locale]/components/ui/dropdown-menu";
const LocalesMenu = () => {
  const locale = useLocale();
  const searchParams = useSearchParams().toString();
  const pathname = usePathname().split("/").slice(2).join("/");
  const fullpath = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-6 h-6 flex items-center"
          id="locales-button"
          aria-label="Locales Button"
        >
          {locale === "en" ? <US /> : <AE />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="font-black">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/en/${fullpath}`}>
              <US className="mr-2 h-5 w-5" /> English
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/ar/${fullpath}`}>
              <AE className="mr-2 h-5 w-5" /> Arabic
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    // <Menu as="div" className="relative inline-block text-left z-20">
    //   <Transition
    //     as={Fragment}
    //     enter="transition ease-out duration-100"
    //     enterFrom="transform opacity-0 scale-95"
    //     enterTo="transform opacity-100 scale-100"
    //     leave="transition ease-in duration-75"
    //     leaveFrom="transform opacity-100 scale-100"
    //     leaveTo="transform opacity-0 scale-95"
    //   >
    //     <Menu.Items className="absolute right-0 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    //       <Card className="px-1 py-1 ">
    //         <Menu.Item>
    //           {({ active }) => (
    //           )}
    //         </Menu.Item>
    //         <Menu.Item>
    //           {({ active }) => (
    //           )}
    //         </Menu.Item>
    //       </Card>
    //     </Menu.Items>
    //   </Transition>
    // </Menu>
  );
};

export default LocalesMenu;
