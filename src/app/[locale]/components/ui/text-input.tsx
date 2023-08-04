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
      animatedPlaceholder: {
        true: "pt-4",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textInputVariants> {
  icon?: React.ReactNode;
  error?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className = "",
      icon,
      error,
      variant,
      placeholder,
      animatedPlaceholder,
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = React.useState(false);
    const mergedClassName = twMerge(
      className,
      textInputVariants({
        variant,
        animatedPlaceholder,
        className: className,
      }),
      icon ? "ps-8" : "",
      error ? "border-red-500 dark:border-red-500" : ""
    );
    return (
      <div>
        <div className="relative overflow-hidden">
          {icon ? (
            <div className="absolute inset-y-0 ms-2 flex items-center pointer-events-none">
              {icon}
            </div>
          ) : null}
          <div>
            <label className="hidden" htmlFor={props.id}>
              {placeholder}
            </label>
            <input
              onFocusCapture={() => setFocus(true)}
              onBlurCapture={() => setFocus(false)}
              className={mergedClassName}
              ref={ref}
              placeholder={animatedPlaceholder ? "" : placeholder}
              {...props}
            />
            {animatedPlaceholder ? (
              <label
                className={`absolute pointer-events-none ${
                  icon ? "ps-8" : "ps-2"
                } top-0 left-0 w-full flex items-center transition-all duration-300 dark:text-neutral-400 ${
                  focus || props.value !== ""
                    ? "h-1/2 transform-gpu text-[0.6rem]"
                    : "h-full"
                }`}
              >
                {placeholder}
              </label>
            ) : null}
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
TextInput.displayName = "TextInput";
export default TextInput;
