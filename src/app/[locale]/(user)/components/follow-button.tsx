"use client";
import React, { Fragment, useMemo } from "react";
import Button from "../../components/ui/button";
import { followUser, unfollowUser } from "@/app/utils/user";
import { toast } from "react-toastify";
import { getUserTheme } from "@/app/utils/theme";
import { TbBellRinging, TbBellRingingFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const toggleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      switch (status) {
        case "follow":
          setStatus("unfollow");
          await followUser(userId);
          router.refresh();
          break;
        case "unfollow":
          setStatus("follow");
          await unfollowUser(userId);
          router.refresh();
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
    <motion.div initial="rest" whileHover="hover" animate="rest">
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
              <p className="hidden lg:block">Follow</p>
            </Fragment>
          ) : (
            <Fragment>
              <motion.div variants={slashMotion}>
                <TbBellRingingFilled />
              </motion.div>{" "}
              <p className="hidden lg:block">Following</p>
            </Fragment>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
};

export default FollowButton;
