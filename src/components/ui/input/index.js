import { useEffect, useState } from "react";
import "@/styles/components/input.css";
import { useClickOutside } from "@/utils";

export const options = {
  styles: {
    bg: "bg-[var(--primary-darker)]",
    color: "text-[var(--background)]",
    placeholder: {
      color: "text-[var(--background)]",
      active: {
        bg: "bg-[var(--primary-darker)]",
        color: "text-[var(--background)]",
      },
    },
  },
  pattern: undefined,
  inputMode: "text",
  type: "text",
};

export default function Input({
  className,
  isError,
  icon,
  placeholder,
  parentValue,
  options,
  onChange = () => {},
  onBeforeInput = () => {},
  onFocusChange = () => {},
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");
  const input = useClickOutside(() => {
    setIsFocused(false);
  });

  const handleClick = () => {
    setIsFocused(true);
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.currentTarget.value);
    }
  };

  const handleBeforeInput = (e) => {
    if (onBeforeInput) {
      onBeforeInput(e);
    }
  };

  useEffect(() => {
    if (onFocusChange) {
      onFocusChange(isFocused);
    }
  }, [isFocused]);

  useEffect(() => {
    if (parentValue !== undefined && parentValue !== null) {
      setValue(parentValue);
    }
  }, [parentValue]);

  return (
    <div
      className={`
        inputContainer 

        ${options.styles.bg}
        ${options.styles.color}
        ${options.styles.hover}
        ${options.styles.active}

        ${className?.container ? className.container : ""} 
        ${isError ? "inputError" : ""}`}
    >
      <input
        ref={input}
        value={value}
        inputMode={options.inputMode}
        className={`
          ${options.styles.bg}
          ${options.styles.color}
        `}
        type={options.type}
        onClick={handleClick}
        onInput={(e) => handleChange(e)}
        onBeforeInput={(e) => handleBeforeInput(e)}
      />

      {icon && <div className={`inputIcon`}>{icon}</div>}

      <div
        className={`
          inputPlaceholder 

          ${options.styles.placeholder.bg}
          ${options.styles.placeholder.color}

          ${
            isFocused || value.length
              ? `
              inputPlaceholderActive 

              ${options.styles.placeholder.active.bg} 
              ${!isError ? options.styles.placeholder.active.color : ""}
            `
              : ""
          } 
          
          ${isError ? "!text-[var(--error)]" : ""}
        `}
      >
        {placeholder}
      </div>
    </div>
  );
}
