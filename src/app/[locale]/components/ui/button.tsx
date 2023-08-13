"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "font-semibold bg-transparent border-none px-4 py-2 rounded-lg text-white transition-all duration-200 inline-flex items-center gap-1 justify-center disabled:bg-gray-400 disabled:shadow-neutral-700/50 disabled:animate-pulse disabled:dark:bg-neutral-700",
  {
    variants: {
      variant: {
        primary:
          "bg-white hover:bg-gray-200 shadow-md dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-800 dark:text-gray-100 border border-neutral-300 dark:border-neutral-800",
        secondary:
          "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-blue-700/50 shadow-lg",
        outlined:
          "hover:dark:bg-neutral-800 hover:bg-neutral-200 border-solid dark:hover:text-white text-gray-800 dark:text-gray-100 border border-neutral-300 dark:border-neutral-800",
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
        large: ["text-lg", "py-3", "px-6"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant, size, ...props }, ref) => {
    const mergedClassName = twMerge(
      className,
      buttonVariants({ variant, size, className: className })
    );
    return (
      <button ref={ref} className={mergedClassName} {...props}>
        {props.children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
