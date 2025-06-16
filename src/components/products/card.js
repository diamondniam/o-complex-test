"use client";

import { useEffect, useState } from "react";
import Button from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import AnimatedNumber from "../ui/animations/number";
import { useCart } from "@/store/useCart";

export default function Card({
  children,
  className = "",
  onChange = () => {},
  data,
}) {
  const [quantity, setQuantity] = useState(0);
  const { items, getItem } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const removeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (getItem(data.id)) {
      setQuantity(getItem(data.id).quantity);
    } else {
      setQuantity(0);
    }
  }, [items]);

  useEffect(() => {
    if (isMounted) {
      onChange(quantity);
    }
  }, [quantity]);

  const buttonStyles = {
    bg: "bg-[var(--background)]",
    hover: "lg:hover:opacity-90",
    active: "active:!opacity-80 active:translate-y-0.5",
  };

  return (
    <div
      className={`flex flex-col justify-between gap-3 bg-[var(--primary-darker)] min-h-[460px] p-3 rounded-lg ${className}`}
    >
      <div className="gapS">
        <div>
          <img
            src={data.image_url}
            className="w-full object-cover h-[250px] rounded-lg"
          />
        </div>

        <p className="textL">{data.title}</p>

        <p className="line-clamp-2">{data.description}</p>
      </div>

      <div className="gapS">
        <div className="flex justify-between items-center">
          <p className="textL">Цена: {data.price}₽</p>
        </div>

        <AnimatePresence>
          {quantity < 1 ? (
            <Button
              options={{
                styles: buttonStyles,
              }}
              onClick={addQuantity}
            >
              Купить
            </Button>
          ) : (
            <div className="flex items-center gap-3 h-10 justify-between">
              <Button
                options={{ styles: buttonStyles }}
                className={"!min-w-[50px]"}
                onClick={removeQuantity}
              >
                -
              </Button>
              <div className="bg-[var(--background)] h-10 min-w-[50px] flex w-full justify-center items-center rounded-lg">
                <AnimatedNumber number={quantity} />
              </div>
              <Button
                options={{ styles: buttonStyles }}
                className={"!min-w-[50px]"}
                onClick={addQuantity}
              >
                +
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
