import Button from "@/app/[locale]/components/ui/button";
import Link from "next/link";
import React from "react";
type Social = "Discord" | "Google";
interface Props {
  social: Social;
  link: string;
  icon: React.ReactNode;
  isConnected: boolean;
}
const SocialConnect: React.FC<Props> = ({
  social,
  link,
  icon,
  isConnected,
}) => {
  return (
    <Link href={isConnected ? "#" : link}>
      <Button
        className="inline-flex gap-2 w-full disabled:animate-none"
        disabled={isConnected}
      >
        {icon}
        {isConnected ? (
          <p className="font-bold text-lg">{social} Connected</p>
        ) : (
          <p className="font-bold text-lg">Connect {social}</p>
        )}
      </Button>
    </Link>
  );
};

export default SocialConnect;
