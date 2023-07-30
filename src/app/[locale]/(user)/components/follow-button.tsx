"use client";
import React, { Fragment, useMemo } from "react";
import Button from "../../components/ui/button";
import { followUser, unfollowUser } from "@/app/utils/user";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import { TbBellRinging, TbBellRingingFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  userId: number;
  isFollowing?: boolean;
}
type ButtonStatus = "follow" | "unfollow";
const slashMotion = {
  rest: { scale: 1 },
  hover: { scale: 1.3 },
};
const FollowButton: React.FC<Props> = ({ userId, isFollowing }) => {
  const [status, setStatus] = React.useState<ButtonStatus>(
    isFollowing ? "unfollow" : "follow"
  );
  const toggleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      switch (status) {
        case "follow":
          setStatus("unfollow");
          await followUser(userId);
          break;
        case "unfollow":
          setStatus("follow");
          await unfollowUser(userId);
          break;
        default:
          break;
      }
    } catch (err) {
      toast.error("Something went wrong", {
        theme: getUserTheme(),
      });
    }
  };
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="flex flex-row gap-2 items-center justify-center"
    >
      <Button
        onClick={toggleFollow}
        variant={status === "follow" ? "secondary" : "primary"}
        className="font-black px-6 w-full"
      >
        <AnimatePresence>
          {status === "follow" ? (
            <Fragment>
              <motion.div variants={slashMotion}>
                <TbBellRinging />
              </motion.div>{" "}
              Follow
            </Fragment>
          ) : (
            <Fragment>
              <motion.div variants={slashMotion}>
                <TbBellRingingFilled />
              </motion.div>{" "}
              Following
            </Fragment>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

export default FollowButton;
