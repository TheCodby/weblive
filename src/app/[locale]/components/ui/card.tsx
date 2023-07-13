import React from "react";
import { twMerge } from "tailwind-merge";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  const mergedClassName = twMerge(
    "overflow-hidden rounded-lg transition-colors duration-200 bg-slate-100 dark:bg-neutral-900 dark:border-neutral-800 border",
    className ?? ""
  );
  return (
    <div {...props} className={mergedClassName}>
      {children}
    </div>
  );
};

export default Card;
