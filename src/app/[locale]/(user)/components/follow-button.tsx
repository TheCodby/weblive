"use client";
import React from "react";
import Button from "../../components/ui/button";
interface Props {
  userId: number;
}
const FollowButton: React.FC<Props> = ({ userId }) => {
  const follow = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <Button
      onSubmit={follow}
      variant="secondary"
      className="font-black px-6 w-full"
    >
      Follow
    </Button>
  );
};

export default FollowButton;
