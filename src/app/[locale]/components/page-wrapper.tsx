"use client";
import { motion } from "framer-motion";
interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}
const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
