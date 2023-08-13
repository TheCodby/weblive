import PageWrapper from "@/app/[locale]/components/page-wrapper";
import React from "react";
import { getDictionary } from "@/dictionaries";
import ProfileSettings from "../components/profile-settings";
import ProfilePicture from "../components/profile-picture";
import { Metadata } from "next";
import { getMyProfile } from "@/app/utils/server/user";
import ProfileVisibility from "../components/profile-visibility";
import Card from "@/app/[locale]/components/ui/card";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
type Props = {
  params: { locale: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.settings.profile.TITLE,
  };
}
const AccountPage = async ({ params }: { params: { locale: string } }) => {
  const dict = await getDictionary(params.locale);
  const user = await getMyProfile();
  return (
    <PageWrapper>
      <div className="flex flex-col gap-4 lg:w-1/2">
        <dl className="flex flex-col gap-2">
          <dt className="font-bold text-3xl dark:text-neutral-100 text-neutral-800 flex flex-col">
            <p>{dict.settings.profile.PROFILE_SETTINGS}</p>
          </dt>
          <dd>
            <Card>
              <Card.Body>
                <ProfileSettings messages={dict} user={user} />
              </Card.Body>
            </Card>
          </dd>
        </dl>
        <dl className="flex flex-col gap-2">
          <dt className="font-bold text-3xl dark:text-neutral-100 text-neutral-800">
            {dict.settings.profile.PROFILE_PICTURE}
          </dt>
          <dd>
            <Card>
              <Card.Body>
                <ProfilePicture messages={dict} user={user} />
              </Card.Body>
            </Card>
          </dd>
        </dl>
        <p className="font-bold text-3xl mt-4">Profile Visibility</p>
        <Card className="dark:bg-neutral-900/80">
          <Card.Body>
            <ProfileVisibility isPublic={user.public} />
          </Card.Body>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default AccountPage;
