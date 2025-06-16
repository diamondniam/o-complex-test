import { motion } from "motion/react";
import AnimatedNumber from "../ui/animations/number";

export default function Item({ data, quantity, index, items }) {
  return (
    <motion.div
      className="flex gap-3 relative"
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="textM font-light w-2/3 truncate">{data.title}</p>
      <div className="textM font-light w-[50px] flex justify-center">
        x
        <AnimatedNumber number={quantity} className={"h-[28px]"} />
      </div>
      <div className="textM font-light flex">
        <AnimatedNumber number={data.price * quantity} className={"h-[28px]"} />
        ₽
      </div>

      {index !== items.length - 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--background)]/10"></div>
      )}
    </motion.div>
  );
}
