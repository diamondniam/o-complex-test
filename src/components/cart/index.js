"use client";

import { useCart } from "@/store/useCart";
import { AnimatePresence } from "motion/react";
import ItemSkeleton from "./itemSkeleton";
import Input from "../ui/input";
import { useEffect, useState } from "react";
import { validatePhone, validatePhoneChar } from "@/utils";
import parsePhoneNumberFromString from "libphonenumber-js";
import Button from "../ui/button";
import Modal from "../ui/modal";
import Item from "./item";
import { buttonStyles, inputOptions } from "./utils";
import { useProducts } from "@/store/useProducts";

export default function Cart() {
  const { items, submit, submitOrder, resetSubmit } = useCart();
  const { products } = useProducts();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [productsError, setProductsError] = useState(false);

  const handleBeforeInput = (e) => {
    const input = e.target;
    const currentValue = input.value;
    const selectionStart = input.selectionStart;

    if (e.data === " ") {
      if (selectionStart === 0) {
        e.preventDefault();
        return;
      }

      if (
        currentValue[selectionStart - 1] === " " ||
        currentValue[selectionStart] === " "
      ) {
        e.preventDefault();
      }
    }

    if (e.data && !validatePhoneChar(e.data)) {
      e.preventDefault();
    }
  };

  const handleOrderClick = () => {
    const isPhoneError = !validatePhone(phone);
    const isProductsError = items.length === 0;

    if (isPhoneError) {
      setPhoneError(true);
    }

    if (isProductsError) {
      setProductsError(true);
    }

    if (isPhoneError || isProductsError) {
      return;
    }

    submitOrder(phone);
  };

  const handleChange = (value) => {
    setPhone(value);

    if (validatePhone(value)) {
      const formatted = parsePhoneNumberFromString(value, "RU");

      if (formatted) {
        setPhone(formatted.formatInternational());
      }
    }
  };

  useEffect(() => {
    if (submit.error.is) {
      setPhoneError(true);
    }
  }, [submit]);

  useEffect(() => {
    setProductsError(false);
    setPhoneError(false);
  }, [items]);

  return (
    <div className="gapM bg-[var(--primary-darker)] lg:w-2/3 w-full mx-auto min-h-[100px] rounded-lg p-3">
      <div className="gapS max-h-[300px]">
        <p className="textL">Добавленные товары</p>

        {items.length ? (
          <div className="overflow-auto smallScrollbar">
            <AnimatePresence initial={false} mode="pop">
              {items.map(({ product, quantity }, index) => (
                <Item
                  key={product.id}
                  data={product}
                  quantity={quantity}
                  index={index}
                  items={items}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <ItemSkeleton isError={productsError} />
        )}
      </div>

      <div className="flex gap-3 max-sm:flex-col max-sm:gap-1">
        <Input
          placeholder={"Введите номер телефона"}
          options={inputOptions}
          parentValue={phone}
          isError={phoneError}
          onChange={handleChange}
          onFocusChange={() => {
            setPhoneError(false);
            setProductsError(false);
          }}
          onBeforeInput={(e) => handleBeforeInput(e)}
        />

        <Button
          options={{ styles: buttonStyles }}
          className={"flex-none"}
          onClick={handleOrderClick}
        >
          Заказать
        </Button>
      </div>

      <Modal
        isOpen={submit.data}
        title={"Заказ успешно оформлен"}
        onClose={() => resetSubmit()}
      >
        <p>Мы скоро свяжемся с вами</p>
      </Modal>
    </div>
  );
}
