import { getDictionary } from "@/dictionaries";
import React from "react";

const Footer = async ({ locale }: { locale: string }) => {
  const dict = await getDictionary(locale);
  return (
    <p className="text-md font-light text-center">
      {dict.footer.POWERED_BY}{" "}
      <a
        className="dark:text-blue-700 text-blue-500 hover:font-medium transition-all duration-300"
        href="https://github.com/TheCodby"
        target="_blank"
      >
        {dict.footer.AUTHOR}
      </a>
    </p>
  );
};

export default Footer;
