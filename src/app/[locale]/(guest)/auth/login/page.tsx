import LoginCard from "./login-card";
import PageWrapper from "../../../components/page-wrapper";
import { getDictionary } from "@/dictionaries";
import { Metadata } from "next";
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.login.TITLE,
  };
}
export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);
  return (
    <PageWrapper className="flex flex-col md:flex-row gap-4 justify-center items-center absolute w-full h-full">
      <LoginCard messages={dict} />
    </PageWrapper>
  );
}
