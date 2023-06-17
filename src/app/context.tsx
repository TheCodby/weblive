"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

const Context = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" themes={["light", "dark"]}>
      {children}
    </ThemeProvider>
  );
};

export default Context;
