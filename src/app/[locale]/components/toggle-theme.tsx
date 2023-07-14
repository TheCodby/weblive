"use client";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { motion, useAnimationControls } from "framer-motion";
const variants = {
  hide: {
    scaleX: 0,
    scaleY: 0,
    rotate: 180,
    transition: { duration: 0.3 },
  },
  sun: {
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    transition: { duration: 0.3 },
  },
  moon: {
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    transition: { duration: 0.3 },
  },
};

const ToggleTheme = () => {
  const controls = useAnimationControls();
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = React.useState(
    theme === "light" ? (
      <MdDarkMode color="#00000" size={24} />
    ) : (
      <MdLightMode color="#FDB813" size={24} />
    )
  );

  const handleClick = () => {
    controls.start("hide").then(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setIcon(
        theme === "light" ? (
          <MdLightMode color="#FDB813" size={24} />
        ) : (
          <MdDarkMode color="#00000" size={24} />
        )
      );
      controls.start(theme === "light" ? "moon" : "sun");
    });
  };

  return (
    <motion.button
      animate={controls}
      initial={theme === "light" ? "moon" : "sun"}
      variants={variants}
      className="bg-transparent text-xl"
      onClick={handleClick}
      id="toggle_theme"
      aria-label="Toggle Theme"
    >
      {icon}
    </motion.button>
  );
};

export default ToggleTheme;
