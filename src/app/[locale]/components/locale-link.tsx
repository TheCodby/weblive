import useLocale from "@/app/hooks/useLocale";
import Link from "next/link";

const LocaleLink = (props: any) => {
  const locale = useLocale();
  return (
    <Link {...props} href={`/${locale}${props.href}`}>
      {props.children}
    </Link>
  );
};

export default LocaleLink;
