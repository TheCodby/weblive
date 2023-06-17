"use client";
import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button className="bg-transparent text-xl m-2" onClick={handleClick}>
      {theme === "light" ? (
        <MdDarkMode color="#00000" size={24} />
      ) : (
        <MdLightMode color="#FDB813" size={24} />
      )}
    </button>
  );
};

export default ToggleTheme;
