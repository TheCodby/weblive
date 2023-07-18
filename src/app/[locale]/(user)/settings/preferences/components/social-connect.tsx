import Button from "@/app/[locale]/components/ui/button";
import Link from "next/link";
import React from "react";
type Social = "Facebook" | "Twitter" | "Discord" | "Twitch" | "Google";
interface Props {
  social: Social;
  link: string;
  icon: React.ReactNode;
}
const SocialConnect: React.FC<Props> = ({ social, link, icon }) => {
  return (
    <Link href={link}>
      <Button className="inline-flex gap-2 w-full">
        {icon} Connect to {social}
      </Button>
    </Link>
  );
};

export default SocialConnect;
