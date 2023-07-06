"use client";
import useLocale from "@/app/hooks/useLocale";
import Link, { LinkProps } from "next/link";
interface Props extends LinkProps, React.HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}
const LocaleLink: React.FC<Props> = (props) => {
  const locale = useLocale();
  return (
    <Link {...props} href={`/${locale}${props.href}`}>
      {props.children}
    </Link>
  );
};

export default LocaleLink;
