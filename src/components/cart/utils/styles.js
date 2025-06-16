import { options } from "@/components/ui/input";

export const inputOptions = {
  ...options,
  inputMode: "tel",
  styles: {
    ...options.styles,
    bg: "bg-[var(--background)]",
    color: "text-[var(--foreground)]",
    placeholder: {
      color: "text-[var(--placeholder)]",
      active: {
        bg: "bg-[var(--background)]",
        color: "!text-[var(--foreground)]",
      },
    },
  },
};

export const buttonStyles = {
  bg: "bg-[var(--background)]",
  color: "text-[var(--foreground)]",
  hover: "hover:brightness-90",
  active: "active:opacity-80 active:translate-y-0.5",
};
