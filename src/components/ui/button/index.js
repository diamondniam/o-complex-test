import { motion } from "motion/react";
import "@/styles/components/button.css";

export default function Button({
  children,
  className,
  options = {
    styles: {
      bg: "bg-[var(--primary)]",
      color: "text-[var(--background)]",
      hover: "hover:brightness-90",
      active: "active:brightness-80",
    },
    layoutId: undefined,
  },
  onClick = () => {},
}) {
  return (
    <motion.button
      className={`
        buttonContainer 
        ${options.styles.bg} ${options.styles.color} ${options.styles.hover} ${options.styles.active}
        ${className}
      `}
      layoutId={options.layoutId}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
