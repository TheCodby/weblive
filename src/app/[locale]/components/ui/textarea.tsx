"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
const textInputVariants = cva(
  "p-2 w-full outline-none transition-all duration-200",
  {
    variants: {
      variant: {
        primary:
          "border-gray-300 border-2 dark:border-neutral-800 bg-transparent rounded-lg bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 focus:border-blue-500 dark:focus:border-blue-700",
        outlined:
          "border-gray-300 border-2 dark:border-neutral-800 dark:hover:border-neutral-700 bg-transparent rounded-lg",
        underline:
          "border-b-2 border-gray-300 dark:border-neutral-800 dark:hover:border-neutral-700 bg-transparent rounded-none hover:border-blue-500 dark:hover:border-blue-600 focus:border-blue-600 dark:focus:border-blue-700",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface TextInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textInputVariants> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextInputProps>(
  ({ className = "", error, variant, placeholder, ...props }, ref) => {
    const mergedClassName = twMerge(
      className,
      textInputVariants({
        variant,
        className: className,
      }),
      error ? "border-red-500 dark:border-red-500" : ""
    );
    return (
      <div>
        <div className="relative overflow-hidden">
          <div>
            <textarea
              className={mergedClassName}
              ref={ref}
              placeholder={placeholder}
              {...props}
            />
          </div>
        </div>
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <label className="text-red-500 text-sm font-bold">{error}</label>
          </motion.div>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
export default Textarea;
