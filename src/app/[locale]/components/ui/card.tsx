import React from "react";
import { twMerge } from "tailwind-merge";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
interface CardHeaderProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}
const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  const mergedClassName = twMerge(
    "text-md bg-neutral-100 dark:bg-neutral-800 p-4 border-b dark:border-neutral-800",
    className
  );
  return (
    <p {...props} className={mergedClassName}>
      {children}
    </p>
  );
};
const CardComponent: React.FC<CardProps> = ({
  children,
  className = "",
  ...props
}) => {
  const mergedClassName = twMerge(
    "overflow-hidden rounded-lg transition-colors duration-200 bg-slate-100 dark:bg-neutral-900 dark:border-neutral-800 border",
    className
  );
  return (
    <div {...props} className={mergedClassName}>
      {children}
    </div>
  );
};

const Card = Object.assign(CardComponent, { Header: CardHeader });
export default Card;
