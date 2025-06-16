// AnimatedNumber.tsx
import { motion, AnimatePresence } from "motion/react";
import React, { useEffect, useRef } from "react";

export default function AnimatedNumber({ number, className }) {
  const prevNumberRef = useRef(number);
  const prevDigits = prevNumberRef.current.toString().split("");
  const nextDigits = number.toString().split("");

  // Update previous number on change
  useEffect(() => {
    prevNumberRef.current = number;
  }, [number]);

  return (
    <div className={`flex gap-0.1 ${className ?? "h-[25px]"}`}>
      {nextDigits.map((digit, idx) => {
        const prevDigit = prevDigits[idx] ?? " ";
        return <Digit key={idx} digit={digit} prevDigit={prevDigit} />;
      })}
    </div>
  );
}

const Digit = ({ digit, prevDigit }) => {
  const direction =
    parseInt(digit) > parseInt(prevDigit)
      ? -1
      : parseInt(digit) < parseInt(prevDigit)
      ? 1
      : 0;

  return (
    <div className="relative w-[1ch] h-full overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: direction * 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -direction * 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute w-full text-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
