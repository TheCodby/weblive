"use client";
import LocaleLink from "@/app/[locale]/components/locale-link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
const getLinks = (messages: any) => {
  return [
    {
      href: `/settings/profile`,
      label: messages.settings.profile.TITLE,
    },
    {
      href: `/settings/privacy`,
      label: messages.settings.privacy.TITLE,
    },
    {
      href: `/settings/preferences`,
      label: messages.settings.preferences.TITLE,
    },
  ];
};
const Navbar = ({ messages }: { messages: any }) => {
  const links = getLinks(messages);
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-10 mb-10 text-lg">
      {links.map((link) => (
        <LocaleLink
          href={link.href}
          key={link.href}
          className={`hover:text-blue-500 dark:hover:text-blue-700 relative ${
            pathname.endsWith(link.href)
              ? `text-blue-500 dark:text-blue-700`
              : ``
          }`}
        >
          {pathname.endsWith(link.href) ? (
            <motion.span
              layoutId="underline"
              className="absolute left-0 top-full block h-[2px] w-full bg-blue-500 dark:bg-blue-700"
            />
          ) : null}
          {link.label}
        </LocaleLink>
      ))}
    </div>
  );
};

export default Navbar;
