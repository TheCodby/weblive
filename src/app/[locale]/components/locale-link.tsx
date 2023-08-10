"use client";
import useLocale from "@/app/hooks/useLocale";
import Link, { LinkProps } from "next/link";
import React from "react";
interface Props extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}
const LocaleLink = React.forwardRef((props: Props, ref) => {
  const locale = useLocale();
  return (
    <Link {...props} href={`/${locale}${props.href}`}>
      {props.children}
    </Link>
  );
});
LocaleLink.displayName = "LocaleLink";
export default LocaleLink;
