"use client";
import useLocale from "@/app/hooks/useLocale";
import Link, { LinkProps } from "next/link";

const LocaleLink: React.FC<any> = (props: any) => {
  const locale = useLocale();
  return (
    <Link {...props} href={`/${locale}${props.href}`}>
      {props.children}
    </Link>
  );
};

export default LocaleLink;
